"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CourseEnrollmentButton({ category, firstPostSlug }) {
  const { status } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEnrollment = async () => {
    if (isSubmitting) {
      return;
    }

    setErrorMessage("");

    if (status !== "authenticated") {
      signIn("google", { callbackUrl: `/${category}` });
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
        {isSubmitting ? "Processando..." : "Comece a aprender"}
      </button>

      {errorMessage && <p className="course-enroll-error">{errorMessage}</p>}
    </div>
  );
}
