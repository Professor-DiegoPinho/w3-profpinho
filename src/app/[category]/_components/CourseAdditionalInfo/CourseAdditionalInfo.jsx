import CourseEbookSection from "@/app/[category]/_components/CourseEbookSection/CourseEbookSection";
import CoursePrerequisitesSection from "@/app/[category]/_components/CoursePrerequisitesSection/CoursePrerequisitesSection";
import CourseResourcesSection from "@/app/[category]/_components/CourseResourcesSection/CourseResourcesSection";
import CourseTagsSection from "@/app/[category]/_components/CourseTagsSection/CourseTagsSection";
import CourseVideoSection from "@/app/[category]/_components/CourseVideoSection/CourseVideoSection";
import InfoToggle from "@/app/[category]/_components/InfoToggle/InfoToggle";

export default function CourseAdditionalInfo({
  isUserEnrolled,
  coursePresentationVideoId,
  courseEbook,
  courseUsefulLinks,
  courseTags,
  coursePrerequisites,
}) {
  if (isUserEnrolled) {
    return (
      <InfoToggle summary="Saiba mais">
        <CourseVideoSection videoId={coursePresentationVideoId} />
        <CourseEbookSection courseEbook={courseEbook} />
        <CourseResourcesSection usefulLinks={courseUsefulLinks} />
        <CourseTagsSection tags={courseTags} />
        <CoursePrerequisitesSection prerequisites={coursePrerequisites} />
      </InfoToggle>
    );
  }

  return (
    <>
      <CourseVideoSection
        videoId={coursePresentationVideoId}
        title="Saiba mais sobre o curso"
      />
      <CourseEbookSection courseEbook={courseEbook} />
      <CourseResourcesSection usefulLinks={courseUsefulLinks} />
      <CourseTagsSection tags={courseTags} />
      <CoursePrerequisitesSection prerequisites={coursePrerequisites} />
    </>
  );
}
