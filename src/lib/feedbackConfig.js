/**
 * Configuração de perguntas para feedback de cursos
 * Fácil de alterar: adicione/remova perguntas mantendo a estrutura
 */

export const FEEDBACK_QUESTIONS = [
  {
    id: "difficulty",
    text: "Qual foi o nível de dificuldade do curso?",
    type: "multiple-choice",
    options: [
      { value: "very-easy", label: "Muito fácil" },
      { value: "easy", label: "Fácil" },
      { value: "appropriate", label: "Apropriado" },
      { value: "difficult", label: "Difícil" },
      { value: "very-difficult", label: "Muito difícil" },
    ],
  },
  {
    id: "content-quality",
    text: "Como você avalia a qualidade do conteúdo?",
    type: "multiple-choice",
    options: [
      { value: "very-poor", label: "Muito ruim" },
      { value: "poor", label: "Ruim" },
      { value: "average", label: "Médio" },
      { value: "good", label: "Bom" },
      { value: "excellent", label: "Excelente" },
    ],
  },
  {
    id: "would-recommend",
    text: "Você recomendaria este curso a alguém?",
    type: "multiple-choice",
    options: [
      { value: "definitely-not", label: "Definitivamente não" },
      { value: "probably-not", label: "Provavelmente não" },
      { value: "neutral", label: "Neutro" },
      { value: "probably-yes", label: "Provavelmente sim" },
      { value: "definitely-yes", label: "Definitivamente sim" },
    ],
  },
];

export const NPS_LABELS = {
  0: "Não recomendaria",
  5: "Neutro",
  10: "Recomendaria muito",
};

export const DEFAULT_COMMENT_PLACEHOLDER =
  "Deixe aqui suas observações, sugestões ou críticas (opcional)";
