import { auth } from "@/auth";
import { db } from "@/lib/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
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
    const enrollmentRef = doc(db, "enrollments", enrollmentId);

    await setDoc(
      enrollmentRef,
      {
        enrollmentId,
        userId,
        courseId,
        enrolledAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro ao salvar enrollment:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
