import { auth } from "@/auth";
import { getUserBookmarks } from "@/lib/bookmarks";
import { getPost } from "@/lib/markdown";
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

  // Enriquecer favoritos com a propriedade order da aula a partir do markdown
  const enrichedBookmarks = bookmarks.map((bookmark) => {
    const post = getPost(bookmark.category, bookmark.slug);
    return {
      ...bookmark,
      order: post ? (typeof post.order === "number" ? post.order : 999) : 999,
    };
  });

  return <BookmarksContent bookmarks={enrichedBookmarks} />;
}
