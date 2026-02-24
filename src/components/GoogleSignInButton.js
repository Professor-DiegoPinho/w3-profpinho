"use client";

import { signIn } from "next-auth/react";

export default function GoogleSignInButton() {
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <button
      type="button"
      className="google-signin-button"
      onClick={handleGoogleSignIn}
      aria-label="Entrar com Google"
    >
      Entrar com Google
    </button>
  );
}