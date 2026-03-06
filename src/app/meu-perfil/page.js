import { auth } from "@/auth";
import { courses } from "@/data/courses";
import {
  getCourseEnrollmentDate,
  getEnrolledCourseIds,
} from "@/lib/enrollment";
import { db } from "@/lib/firebase";
import { getCategoryTitle } from "@/lib/markdown";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Meu perfil | Diego Pinho Learning Hub",
  description:
    "Acompanhe os cursos em que voce esta inscrito e veja os detalhes da sua conta.",
};

function formatDate(value) {
  if (!value) {
    return null;
  }

  if (typeof value?.toDate === "function") {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(value.toDate());
  }

  const parsedDate = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(parsedDate);
}

function resolveCourseLabel(courseId) {
  const matchingCourse = courses.find((course) => course.slug === courseId);

  if (matchingCourse?.title) {
    return matchingCourse.title;
  }

  return getCategoryTitle(courseId);
}

export default async function MyProfilePage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/");
  }

  const enrolledCourseIds = Array.isArray(session?.user?.enrolledCourseIds)
    ? session.user.enrolledCourseIds
    : await getEnrolledCourseIds(userId);

  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef).catch(() => null);

  if (!userDoc?.exists()) {
    redirect("/");
  }

  const userData = userDoc.data() || {};

  const enrolledCourses = await Promise.all(
    enrolledCourseIds.map(async (courseId) => {
      const enrolledAt = await getCourseEnrollmentDate(userId, courseId);

      return {
        id: courseId,
        title: resolveCourseLabel(courseId),
        enrolledAt,
      };
    }),
  );

  enrolledCourses.sort((a, b) => {
    if (!a.enrolledAt && !b.enrolledAt) {
      return a.title.localeCompare(b.title, "pt-BR");
    }

    if (!a.enrolledAt) {
      return 1;
    }

    if (!b.enrolledAt) {
      return -1;
    }

    return b.enrolledAt.getTime() - a.enrolledAt.getTime();
  });

  const userName = session?.user?.name || userData?.name || "Aluno";
  const userEmail = session?.user?.email || userData?.email || "Nao informado";
  const userImage =
    session?.user?.image || userData?.image || "/default-avatar.svg";
  const createdAtLabel = formatDate(userData?.createdAt);
  const totalEnrolledCoursesLabel =
    enrolledCourses.length === 1
      ? "1 curso inscrito"
      : `${enrolledCourses.length} cursos inscritos`;

  return (
    <section className="profile-page">
      <header className="profile-header">
        <div className="profile-header-content">
          <Image
            src={userImage}
            alt={`Foto de ${userName}`}
            width={72}
            height={72}
            className="profile-avatar"
          />
          <div>
            <h1>Meu perfil</h1>
            <p>Acompanhe seus cursos inscritos e os dados da sua conta.</p>
          </div>
        </div>
      </header>

      <div className="profile-summary-grid">
        <div className="profile-summary-card">
          <span className="profile-summary-label">Nome</span>
          <strong>{userName}</strong>
        </div>
        <div className="profile-summary-card">
          <span className="profile-summary-label">Email</span>
          <strong>{userEmail}</strong>
        </div>
      </div>

      <div className="profile-grid">
        <article className="profile-card">
          <div className="profile-courses-header">
            <div>
              <h2>Meus cursos</h2>
              <p className="profile-courses-subtitle">
                Acompanhe os cursos que já fazem parte da sua jornada.
              </p>
            </div>
          </div>

          {enrolledCourses.length > 0 ? (
            <ul className="profile-course-list">
              {enrolledCourses.map((course) => (
                <li key={course.id} className="profile-course-item">
                  <div className="profile-course-content">
                    <h3 className="profile-course-title">{course.title}</h3>
                    <p className="profile-course-meta">
                      {course.enrolledAt
                        ? `Inscrição em ${formatDate(course.enrolledAt)}`
                        : "Data de inscrição indisponível"}
                    </p>
                  </div>
                  <Link href={`/${course.id}`} className="profile-course-link" aria-label={`Acessar curso ${course.title}`}>
                    Continuar curso
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="profile-empty-state">
              <p>Você ainda não possui inscrições em cursos.</p>
              <Link href="/" className="profile-course-link">
                Explorar cursos
              </Link>
            </div>
          )}

          <p className="profile-course-count-text" aria-label="Quantidade de cursos inscritos">
            Total: <strong>{totalEnrolledCoursesLabel}</strong>
          </p>
        </article>

        <article className="profile-card">
          <h2>Certificados</h2>
          <p className="profile-coming-soon-note">
            Nenhum certificado até o momento.
          </p>
        </article>

        <aside className="profile-card">
          <h2>Informações adicionais</h2>
          <dl className="profile-info-list">
            <div>
              <dt>Conta criada em</dt>
              <dd>{createdAtLabel || "Nao disponivel"}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
