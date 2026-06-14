import { requireAdmin } from "@/lib/adminAuth";
import { adminDb } from "@/lib/firebaseAdmin";
import { getCategoryTitle, getCourseLessonsCount } from "@/lib/markdown";
import { convertTimestamp } from "@/app/admin/_utils/format";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { authorized, response } = await requireAdmin();
    if (!authorized) {
      return response;
    }

    const { userId } = await params;

    // 1. Get user details
    const userDoc = await adminDb.collection("users").doc(userId).get();
    if (!userDoc.exists) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }
    const userData = userDoc.data();

    // 2. Fetch all enrollments for this user
    const enrollmentsSnapshot = await adminDb
      .collection("enrollments")
      .where("userId", "==", userId)
      .get();

    const enrollmentsMap = {};
    enrollmentsSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.courseId) {
        enrollmentsMap[data.courseId] = {
          enrolledAt: convertTimestamp(data.enrolledAt) || null,
        };
      }
    });

    // 3. Fetch all progress docs for this user
    const progressSnapshot = await adminDb
      .collection("users")
      .doc(userId)
      .collection("progress")
      .get();

    const progressMap = {};
    progressSnapshot.forEach((doc) => {
      const data = doc.data();
      progressMap[doc.id] = {
        completedLessons: data.completedLessons || [],
        totalLessons: data.totalLessons || 0,
        completionPercentage: data.completionPercentage || 0,
        completedAt: convertTimestamp(data.completedAt) || null,
        lastUpdatedAt: convertTimestamp(data.lastUpdatedAt) || null,
      };
    });

    // 4. Fetch all certificates for this user
    const certificatesSnapshot = await adminDb
      .collection("users")
      .doc(userId)
      .collection("certificates")
      .get();

    const certificatesMap = {};
    certificatesSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.courseSlug) {
        certificatesMap[data.courseSlug] = {
          certificateId: doc.id,
          generatedAt: convertTimestamp(data.generatedAt) || null,
          pdfUrl: data.pdfUrl || null,
        };
      }
    });

    // 5. Combine all course info
    // Get all unique courseIds from enrollments, progress, and certificates
    const allCourseIds = Array.from(
      new Set([
        ...Object.keys(enrollmentsMap),
        ...Object.keys(progressMap),
        ...Object.keys(certificatesMap),
      ])
    );

    const courses = allCourseIds.map((courseId) => {
      const enrollment = enrollmentsMap[courseId];
      const progress = progressMap[courseId];
      const certificate = certificatesMap[courseId];
      const totalLessons = getCourseLessonsCount(courseId);

      return {
        courseId,
        courseTitle: getCategoryTitle(courseId),
        isEnrolled: !!enrollment,
        enrolledAt: enrollment?.enrolledAt || null,
        completedLessonsCount: progress?.completedLessons?.length || 0,
        totalLessonsCount: totalLessons || progress?.totalLessons || 0,
        completionPercentage: progress?.completionPercentage || 0,
        completedAt: progress?.completedAt || null,
        lastUpdatedAt: progress?.lastUpdatedAt || null,
        certificate: certificate
          ? {
              certificateId: certificate.certificateId,
              generatedAt: certificate.generatedAt,
              pdfUrl: certificate.pdfUrl,
            }
          : null,
      };
    });

    return NextResponse.json({
      success: true,
      user: {
        userId,
        name: userData.name || "N/A",
        email: userData.email || "N/A",
        role: userData.role || null,
        createdAt: convertTimestamp(userData.createdAt),
        lastLoginAt: convertTimestamp(userData.lastLoginAt),
      },
      courses,
    });
  } catch (error) {
    console.error("Erro ao buscar detalhes do usuário:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
