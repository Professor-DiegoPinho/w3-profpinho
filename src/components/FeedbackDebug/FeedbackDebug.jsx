"use client";

/**
 * Componente de debug para diagnosticar problemas com o feedback
 * Mostra na tela por que o card de feedback não está aparecendo
 */
export default function FeedbackDebug({
  userId,
  isUserEnrolled,
  completionPercentage,
  projectApproved,
  feedbackResponded,
}) {
  // Determinar qual é o problema
  const reasons = [];
  
  if (!userId) {
    reasons.push("❌ Usuário não logado (userId não existe)");
  }
  
  if (!isUserEnrolled) {
    reasons.push("❌ Usuário não inscrito neste curso");
  }
  
  if (completionPercentage !== 100) {
    reasons.push(`❌ Curso não está 100% completo (${completionPercentage}%)`);
  }
  
  if (!projectApproved) {
    reasons.push("❌ Projeto ainda não foi aprovado");
  }
  
  if (feedbackResponded) {
    reasons.push("❌ Você já respondeu o feedback deste curso");
  }

  // Se tudo estiver ok
  if (reasons.length === 0) {
    return (
      <div style={{
        background: "#e8f5e9",
        border: "1px solid #4caf50",
        borderRadius: "8px",
        padding: "12px 16px",
        margin: "16px 0",
        fontSize: "14px",
        color: "#2e7d32",
      }}>
        ✅ Tudo certo! O card de feedback deveria estar visível acima.
      </div>
    );
  }

  return (
    <div style={{
      background: "#fff3e0",
      border: "1px solid #ff9800",
      borderRadius: "8px",
      padding: "16px",
      margin: "16px 0",
      fontSize: "14px",
      color: "#e65100",
    }}>
      <strong>🔍 Diagnóstico do Feedback:</strong>
      <div style={{ marginTop: "8px" }}>
        {reasons.map((reason, index) => (
          <div key={index} style={{ marginBottom: "6px" }}>
            {reason}
          </div>
        ))}
      </div>
      <div style={{ marginTop: "12px", fontSize: "12px", opacity: 0.7 }}>
        <strong>Estado atual:</strong>
        <pre style={{ 
          background: "rgba(0,0,0,0.05)", 
          padding: "8px", 
          borderRadius: "4px",
          overflow: "auto"
        }}>
{JSON.stringify({
  userId: userId ? "✓ existe" : "✗ não existe",
  isUserEnrolled,
  completionPercentage,
  projectApproved,
  feedbackResponded,
}, null, 2)}
        </pre>
      </div>
    </div>
  );
}
