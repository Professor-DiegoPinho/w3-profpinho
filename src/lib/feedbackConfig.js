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
    worstOptions: ["difficult", "very-difficult"],
    showTextareaIfWorst: true,
  },
  {
    id: "video-quality",
    text: "Como você avalia a qualidade dos vídeos?",
    type: "multiple-choice",
    options: [
      { value: "excellent", label: "Excelente" },
      { value: "good", label: "Bom" },
      { value: "average", label: "Médio" },
      { value: "poor", label: "Ruim" },
      { value: "very-poor", label: "Muito ruim" },
    ],
    worstOptions: ["poor", "very-poor"],
    showTextareaIfWorst: true,
  },
  {
    id: "text-quality",
    text: "Como você avalia a qualidade dos compilados?",
    type: "multiple-choice",
    options: [
      { value: "excellent", label: "Excelente" },
      { value: "good", label: "Bom" },
      { value: "average", label: "Médio" },
      { value: "poor", label: "Ruim" },
      { value: "very-poor", label: "Muito ruim" },
    ],
    worstOptions: ["poor", "very-poor"],
    showTextareaIfWorst: true,
  },
  {
    id: "exercise-quality",
    text: "Como você avalia a qualidade dos exercícios?",
    type: "multiple-choice",
    options: [
      { value: "excellent", label: "Excelente" },
      { value: "good", label: "Bom" },
      { value: "average", label: "Médio" },
      { value: "poor", label: "Ruim" },
      { value: "very-poor", label: "Muito ruim" },
    ],
    worstOptions: ["poor", "very-poor"],
    showTextareaIfWorst: true,
  },
];

export const NPS_LABELS = {
  0: "Não recomendaria",
  5: "Neutro",
  10: "Recomendaria muito",
};

export const DEFAULT_COMMENT_PLACEHOLDER =
  "Deixe aqui suas observações, sugestões ou críticas (opcional)";
