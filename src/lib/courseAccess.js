import {
  COURSE_ACCESS_TYPES,
  COURSE_VISIBILITY,
  courses,
} from '@/data/courses';

function getCourse(courseOrSlug) {
  if (!courseOrSlug) {
    return null;
  }

  if (typeof courseOrSlug === 'string') {
    return courses.find((course) => course.slug === courseOrSlug) || null;
  }

  return courseOrSlug;
}

export function getCourseAccessType(courseOrSlug) {
  const course = getCourse(courseOrSlug);

  if (!course?.accessType) {
    return COURSE_ACCESS_TYPES.FREE_COURSE;
  }

  return course.accessType;
}

export function getCourseVisibility(courseOrSlug) {
  const course = getCourse(courseOrSlug);

  if (!course?.visibility) {
    return COURSE_VISIBILITY.PUBLIC;
  }

  return course.visibility;
}

export function isPublicCourse(courseOrSlug) {
  return getCourseVisibility(courseOrSlug) === COURSE_VISIBILITY.PUBLIC;
}

export function courseRequiresEnrollment(courseOrSlug) {
  return getCourseAccessType(courseOrSlug) !== COURSE_ACCESS_TYPES.TUTORIAL;
}

export function isPaidCourse(courseOrSlug) {
  return getCourseAccessType(courseOrSlug) === COURSE_ACCESS_TYPES.PAID_COURSE;
}

export function canUserAccessCourseLessons(courseOrSlug, enrolledCourseIds = []) {
  if (!courseRequiresEnrollment(courseOrSlug)) {
    return true;
  }

  return enrolledCourseIds.includes(typeof courseOrSlug === 'string' ? courseOrSlug : courseOrSlug?.slug);
}

export function isCourseVisibleToUser(courseOrSlug, enrolledCourseIds = []) {
  const course = getCourse(courseOrSlug);

  if (!course) {
    return true;
  }

  if (isPublicCourse(course)) {
    return true;
  }

  return enrolledCourseIds.includes(course.slug);
}

export function getCourseAccessLabel(courseOrSlug) {
  const accessType = getCourseAccessType(courseOrSlug);

  if (accessType === COURSE_ACCESS_TYPES.TUTORIAL) {
    return 'Tutorial aberto';
  }

  if (accessType === COURSE_ACCESS_TYPES.PAID_COURSE) {
    return 'Curso pago';
  }

  return 'Curso gratuito';
}
