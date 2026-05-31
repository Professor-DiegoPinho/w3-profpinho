export function serializeProgressData(progressData) {
  if (!progressData) {
    return null;
  }

  return {
    totalLessons: progressData.totalLessons,
    completionPercentage: progressData.completionPercentage,
    completedLessons: progressData.completedLessons || [],
    feedbackResponded: progressData.feedbackResponded || false,
    completedAt: progressData.completedAt?.toDate?.()
      ? progressData.completedAt.toDate().toISOString()
      : null,
    lastUpdatedAt: progressData.lastUpdatedAt?.toDate?.()
      ? progressData.lastUpdatedAt.toDate().toISOString()
      : null,
    feedbackRespondedAt: progressData.feedbackRespondedAt?.toDate?.()
      ? progressData.feedbackRespondedAt.toDate().toISOString()
      : null,
  };
}