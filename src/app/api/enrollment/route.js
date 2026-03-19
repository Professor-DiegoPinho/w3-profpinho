import { auth } from "@/auth";
import { adminDb } from "@/lib/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseId } = await request.json();

    if (!courseId || typeof courseId !== "string") {
      return NextResponse.json({ error: "courseId inválido" }, { status: 400 });
    }

    const enrollmentId = `${userId}_${courseId}`;
    const enrollmentRef = adminDb.collection("enrollments").doc(enrollmentId);
    const enrollmentDoc = await enrollmentRef.get();

    const payload = {
      enrollmentId,
      userId,
      courseId,
    };

    if (!enrollmentDoc.exists) {
      payload.enrolledAt = FieldValue.serverTimestamp();
    }

    await enrollmentRef.set(payload, { merge: true });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro ao salvar enrollment:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
