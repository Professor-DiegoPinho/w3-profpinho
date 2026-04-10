import { requireAdmin } from "@/lib/adminAuth";
import { adminDb } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { authorized, response } = await requireAdmin();

    if (!authorized) {
      return response;
    }

    const usersSnapshot = await adminDb.collection("users").get();
    const users = [];

    for (const doc of usersSnapshot.docs) {
      const data = doc.data();
      users.push({
        userId: doc.id,
        name: data.name || null,
        email: data.email || null,
        role: data.role || null,
        createdAt: data.createdAt,
        lastLoginAt: data.lastLoginAt,
      });
    }

    return NextResponse.json({
      success: true,
      data: users,
      count: users.length,
    });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return NextResponse.json(
      { error: "Erro ao buscar usuários" },
      { status: 500 }
    );
  }
}
