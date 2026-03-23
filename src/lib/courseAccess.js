import {
    CONTENT_TYPE,
    CONTENT_VISIBILITY,
    content,
} from '@/data';

function normalizeCategorySlug(slug) {
  if (typeof slug !== 'string') {
    return slug;
  }

  return slug.replace(/[_-](resume|resumo)$/i, '');
}

function inferCategoryAccessType(slug) {
  if (typeof slug !== 'string') {
    return null;
  }

  if (/[_-](resume|resumo)$/i.test(slug)) {
    return CONTENT_TYPE.RESUME;
  }

  return null;
}

function getCourse(courseOrSlug) {
  if (!courseOrSlug) {
    return null;
  }

  if (typeof courseOrSlug === 'string') {
    const normalizedSlug = normalizeCategorySlug(courseOrSlug);
    const inferredAccessType = inferCategoryAccessType(courseOrSlug);

    if (inferredAccessType) {
      const typedMatch = content.find(
        (course) => course.slug === normalizedSlug && course.accessType === inferredAccessType
      );

      if (typedMatch) {
        return typedMatch;
      }
    }

    return (
      content.find((course) => course.slug === courseOrSlug)
      || content.find((course) => course.slug === normalizedSlug)
      || null
    );
  }

  return courseOrSlug;
}

export function getCourseAccessType(courseOrSlug) {
  const course = getCourse(courseOrSlug);

  if (!course?.accessType) {
    return CONTENT_TYPE.FREE_COURSE;
  }

  return course.accessType;
}

export function getCourseVisibility(courseOrSlug) {
  const course = getCourse(courseOrSlug);

  if (!course?.visibility) {
    return CONTENT_VISIBILITY.PUBLIC;
  }

  return course.visibility;
}

export function isPublicCourse(courseOrSlug) {
  return getCourseVisibility(courseOrSlug) === CONTENT_VISIBILITY.PUBLIC;
}

export function courseRequiresEnrollment(courseOrSlug) {
  const accessType = getCourseAccessType(courseOrSlug);

  return accessType !== CONTENT_TYPE.TUTORIAL && accessType !== CONTENT_TYPE.RESUME;
}

export function isPaidCourse(courseOrSlug) {
  return getCourseAccessType(courseOrSlug) === CONTENT_TYPE.PAID_COURSE;
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

  if (accessType === CONTENT_TYPE.TUTORIAL) {
    return 'Tutorial aberto';
  }

  if (accessType === CONTENT_TYPE.RESUME) {
    return 'Resumo aberto';
  }

  if (accessType === CONTENT_TYPE.PAID_COURSE) {
    return 'Curso pago';
  }

  return 'Curso gratuito';
}
