"use client";

import { signIn } from "next-auth/react";

export default function ProfileConnectButton({ provider, providerLabel, className }) {
  const handleConnect = () => {
    signIn(provider, { callbackUrl: "/meu-perfil" });
  };

  return (
    <button
      type="button"
      className={className ?? "profile-connect-link"}
      onClick={handleConnect}
      aria-label={`Conectar conta ${providerLabel}`}
    >
      Conectar
    </button>
  );
}