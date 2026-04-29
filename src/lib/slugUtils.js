/**
 * Remove o prefixo numérico de um slug de aula
 * Exemplo: "01-introducao-ao-html" → "introducao-ao-html"
 *
 * O prefixo numérico é apenas para organização interna do conteúdo e não deve aparecer nas URLs ou no progresso do aluno.
 *
 * @param {string} slug - O slug que pode conter prefixo numérico
 * @returns {string} - O slug sem o prefixo numérico
 */
export function stripLessonPrefix(slug) {
  if (typeof slug !== 'string') {
    return slug;
  }

  // Remove o padrão "NN-" do início (onde NN é um ou mais dígitos)
  return slug.replace(/^\d+-/, '');
}
