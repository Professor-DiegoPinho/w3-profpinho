/**
 * Formata timestamp em data/hora legível
 */
export function formatDate(timestamp) {
  if (!timestamp) return "—";
  
  let date;
  if (typeof timestamp === "string") {
    date = new Date(timestamp);
  } else if (typeof timestamp?.toDate === "function") {
    date = timestamp.toDate();
  } else if (typeof timestamp === "number") {
    date = new Date(timestamp);
  } else {
    return "—";
  }

  if (isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Retorna classe CSS para cor do badge NPS
 */
export function getNpsColor(score) {
  if (score >= 9) return "admin-nps-promoter";
  if (score >= 7) return "admin-nps-passive";
  return "admin-nps-detractor";
}

/**
 * Retorna label legível para o NPS
 */
export function getNpsLabel(score) {
  if (score >= 9) return "Promotor";
  if (score >= 7) return "Neutro";
  return "Detrator";
}

/**
 * Retorna o label legível de uma resposta baseado no ID da pergunta e valor
 */
export function getAnswerLabel(questionId, answerValue, feedbackQuestions) {
  const question = feedbackQuestions.find(q => q.id === questionId);
  if (!question) return answerValue;
  
  const option = question.options?.find(opt => opt.value === answerValue);
  return option?.label || answerValue;
}

/**
 * Verifica se uma resposta é considerada "pior" (crítica)
 */
export function isWorstAnswer(questionId, answerValue, feedbackQuestions) {
  const question = feedbackQuestions.find(q => q.id === questionId);
  if (!question) return false;
  
  return question.worstOptions?.includes(answerValue) || false;
}
