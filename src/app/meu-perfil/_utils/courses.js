import { content } from '@/data';
import { getCategoryTitle } from '@/lib/markdown';

export function resolveCourseLabel(courseId) {
  const matchingCourse = content.find((course) => course.slug === courseId);

  if (matchingCourse?.title) {
    return matchingCourse.title;
  }

  return getCategoryTitle(courseId);
}

export function getCorrectLessonProgress(totalLessons, completedLessonsCount) {
  if (totalLessons <= 0) {
    return 0;
  }

  return Math.round((completedLessonsCount / totalLessons) * 100);
}