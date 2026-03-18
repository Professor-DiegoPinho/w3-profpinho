import { auth } from "@/auth";
import { NextResponse } from "next/server";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

const COOKIE_NAME = "utm_data";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 dias em segundos
const SITE_ORIGIN = "https://hub.diegopinho.com.br";

export default auth(function proxy(request) {
  const { searchParams } = request.nextUrl;

  const utmData = {};
  let hasUTM = false;

  for (const key of UTM_KEYS) {
    const value = searchParams.get(key);
    if (value) {
      utmData[key] = value;
      hasUTM = true;
    }
  }

  const referer = request.headers.get("referer");
  if (referer && !referer.startsWith(SITE_ORIGIN)) {
    utmData.referrer = referer;
  }

  const response = NextResponse.next();

  const existingCookie = request.cookies.get(COOKIE_NAME);

  if (hasUTM || (!existingCookie && utmData.referrer)) {
    const value = encodeURIComponent(JSON.stringify(utmData));
    response.headers.append(
      "Set-Cookie",
      `${COOKIE_NAME}=${value}; Path=/; SameSite=Lax; HttpOnly; Max-Age=${COOKIE_MAX_AGE}`
    );
  }

  return response;
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/auth).*)",
  ],
};
