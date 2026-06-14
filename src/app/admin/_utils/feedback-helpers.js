/**
 * Retorna classe CSS (nome da classe semantizada) para cor do badge NPS
 */
export function getNpsColor(score) {
  if (score >= 9) return "promoter";
  if (score >= 7) return "passive";
  return "detractor";
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
