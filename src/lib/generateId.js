// Utility function to generate ID from text
export const generateId = (text) => {
  if (typeof text === 'string') {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
  return '';
};
