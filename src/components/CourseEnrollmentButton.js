"use client";

import AuthEnrollmentModal from "@/components/AuthEnrollmentModal";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CourseEnrollmentButton({
  category,
  firstPostSlug,
  accessType,
  requiresEnrollment,
  requiresPayment,
  checkoutUrl,
}) {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const isEnrolled = Array.isArray(session?.user?.enrolledCourseIds)
    ? session.user.enrolledCourseIds.includes(category)
    : false;

  const handleEnrollment = async () => {
    if (isSubmitting) {
      return;
    }

    setErrorMessage("");

    if (!requiresEnrollment) {
      router.push(`/${category}/${firstPostSlug}`);
      return;
    }

    if (requiresPayment && !isEnrolled) {
      if (!checkoutUrl) {
        setErrorMessage("Este curso exige pagamento. Link de checkout indisponível no momento.");
        return;
      }

      window.location.href = checkoutUrl;
      return;
    }

    if (status !== "authenticated") {
      setIsAuthModalOpen(true);
      return;
    }

    if (isEnrolled) {
      router.push(`/${category}/${firstPostSlug}`);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/enrollment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: category,
        }),
      });

      if (!response.ok) {
        throw new Error("Falha ao salvar enrollment");
      }

      const currentEnrolled = Array.isArray(session?.user?.enrolledCourseIds)
        ? session.user.enrolledCourseIds
        : [];

      if (!currentEnrolled.includes(category)) {
        await update({
          enrolledCourseIds: [...currentEnrolled, category],
        });
      }

      router.push(`/${category}/${firstPostSlug}`);
    } catch (error) {
      console.error("Erro ao processar enrollment:", error);
      setErrorMessage("Não foi possível concluir sua inscrição. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="course-enroll-button"
        onClick={handleEnrollment}
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Acessando conteúdo..."
          : isEnrolled
            ? "Acessar aulas"
            : requiresEnrollment
              ? accessType === "paid-course"
                ? "Comprar curso"
                : "Inscreva-se gratuitamente"
              : "Acessar tutorial"}
      </button>

      {errorMessage && <p className="course-enroll-error">{errorMessage}</p>}

      <AuthEnrollmentModal
        isOpen={isAuthModalOpen}
        category={category}
        onClose={() => setIsAuthModalOpen(false)}
        onConfirm={() => signIn("google", { callbackUrl: `/${category}` })}
      />
    </div>
  );
}
