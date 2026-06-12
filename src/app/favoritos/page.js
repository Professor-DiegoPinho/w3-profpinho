import { auth } from "@/auth";
import { getUserBookmarks } from "@/lib/bookmarks";
import { redirect } from "next/navigation";
import BookmarksContent from "./_components/BookmarksContent/BookmarksContent";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Favoritos | Diego Pinho Learning Hub",
  description:
    "Veja suas aulas favoritadas e acesse rapidamente os conteúdos que você mais gostou.",
};

export default async function BookmarksPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/");
  }

  const bookmarks = await getUserBookmarks(userId);

  return <BookmarksContent bookmarks={bookmarks} />;
}
