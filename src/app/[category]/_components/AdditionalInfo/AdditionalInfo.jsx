import EbookSection from "@/app/[category]/_components/EbookSection/EbookSection";
import PrerequisitesSection from "@/app/[category]/_components/PrerequisitesSection/PrerequisitesSection";
import ResourcesSection from "@/app/[category]/_components/ResourcesSection/ResourcesSection";
import TagsSection from "@/app/[category]/_components/TagsSection/TagsSection";
import VideoSection from "@/app/[category]/_components/VideoSection/VideoSection";
import InfoToggle from "@/app/[category]/_components/InfoToggle/InfoToggle";

export default function AdditionalInfo({
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
        <VideoSection videoId={coursePresentationVideoId} />
        <EbookSection courseEbook={courseEbook} />
        <ResourcesSection usefulLinks={courseUsefulLinks} />
        <TagsSection tags={courseTags} />
        <PrerequisitesSection prerequisites={coursePrerequisites} />
      </InfoToggle>
    );
  }

  return (
    <>
      <VideoSection
        videoId={coursePresentationVideoId}
        title="Saiba mais sobre o curso"
      />
      <EbookSection courseEbook={courseEbook} />
      <ResourcesSection usefulLinks={courseUsefulLinks} />
      <TagsSection tags={courseTags} />
      <PrerequisitesSection prerequisites={coursePrerequisites} />
    </>
  );
}
