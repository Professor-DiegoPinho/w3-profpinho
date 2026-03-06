export function isModifiedClick(event) {
  return (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  );
}

export function isCourseEnrolled(category) {
  if (typeof category?.isEnrolled === 'boolean') {
    return category.isEnrolled;
  }

  return Array.isArray(category.posts) && category.posts.some((post) => !post.isRestricted);
}
