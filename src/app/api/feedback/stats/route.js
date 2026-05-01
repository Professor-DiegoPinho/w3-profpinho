import { getFeedbackStats } from "@/lib/feedback";
import { NextResponse } from "next/server";

/**
 * GET /api/feedback/stats?courseSlug=...
 * ⚠️ DESATIVADA - Estatísticas apenas para uso interno
 * Métricas de feedback são armazenadas internamente e não expostas publicamente
 */
export async function GET(request) {
  return NextResponse.json(
    { error: "Endpoint desativado - Feedback disponível apenas internamente" },
    { status: 403 }
  );
}
    console.error("Erro ao buscar stats de feedback:", error);
    return NextResponse.json(
      { error: "Erro ao buscar estatísticas" },
      { status: 500 }
    );
  }
}
