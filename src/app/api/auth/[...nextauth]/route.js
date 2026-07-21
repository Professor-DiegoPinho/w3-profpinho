import { handlers } from "@/auth";

const originalGET = handlers.GET;

export async function GET(request) {
  const url = new URL(request.url);
  // Intercepta a rota de sessão para retornar o usuário mockado no ambiente de teste/desenvolvimento
  if (url.pathname.endsWith("/session")) {
    if (process.env.NODE_ENV !== "production") {
      try {
        const cookieHeader = request.headers.get("cookie") || "";
        const mockCookieMatch = cookieHeader.match(/e2e-mock-user=([^;]+)/);
        if (mockCookieMatch) {
          const rawValue = decodeURIComponent(mockCookieMatch[1]);
          const mockUser = JSON.parse(rawValue);
          return new Response(
            JSON.stringify({
              user: {
                id: mockUser.id,
                name: mockUser.name,
                email: mockUser.email,
                role: mockUser.role || "user",
                enrolledCourseIds: mockUser.enrolledCourseIds || [],
              },
              expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            }),
            {
              status: 200,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }
      } catch (e) {
        console.error("[AUTH MOCK ROUTE ERROR]", e);
      }
    }
  }

  return originalGET(request);
}

export const { POST } = handlers;