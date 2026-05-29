import { useMemo } from 'react';

export function getCategoryIcon(accessType) {
  switch (accessType) {
    case 'tutorial':
      return '/icons/ic_tutorials.svg';
    case 'course':
      return '/icons/ic_courses.svg';
    case 'resume':
      return '/icons/ic_resumes.svg';
    default:
      return '/icons/ic_tutorials.svg';
  }
}

export function isUserEnrolled(session, courseId) {
  return session?.user?.enrolledCourseIds?.includes(courseId) ?? false;
}

export function findSidebarCategory(sidebarData, categorySlug) {
  if (!Array.isArray(sidebarData) || !categorySlug) {
    return null;
  }

  return sidebarData.find((category) => category.category === categorySlug) ?? null;
}

export function useSidebarCollections(sidebarData) {
  return useMemo(() => {
    if (!Array.isArray(sidebarData)) {
      return { tutorials: [], courses: [], resumes: [] };
    }

    return {
      tutorials: sidebarData.filter((category) => category.accessType === 'tutorial'),
      courses: sidebarData.filter(
        (category) => category.accessType === 'free-course' || category.accessType === 'paid-course',
      ),
      resumes: sidebarData.filter((category) => category.accessType === 'resume'),
    };
  }, [sidebarData]);
}

export function useSidebarContextData(sidebarData, currentCategory, session) {
  return useMemo(() => {
    const defaultState = { currentContext: null, contextItems: [], categoryTitle: '' };

    if (!currentCategory || !Array.isArray(sidebarData)) {
      return defaultState;
    }

    const matchedCategory = findSidebarCategory(sidebarData, currentCategory);

    if (!matchedCategory) {
      return defaultState;
    }

    const { accessType, posts = [], title = '' } = matchedCategory;

    if (accessType === 'free-course' || accessType === 'paid-course') {
      if (accessType === 'paid-course' && !isUserEnrolled(session, matchedCategory.category)) {
        return defaultState;
      }

      return {
        currentContext: 'course',
        contextItems: posts,
        categoryTitle: title,
      };
    }

    if (accessType === 'tutorial') {
      return {
        currentContext: 'tutorial',
        contextItems: posts,
        categoryTitle: title,
      };
    }

    if (accessType === 'resume') {
      return {
        currentContext: 'resume',
        contextItems: sidebarData.filter((category) => category.accessType === 'resume'),
        categoryTitle: title,
      };
    }

    return defaultState;
  }, [currentCategory, sidebarData, session]);
}