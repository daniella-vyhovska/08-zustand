import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "../../../../lib/getQueryClient";
import { fetchNotes } from "../../../../lib/api";
import NotesClient from "../[...slug]/Notes.client";

export default async function FilteredNotesPage({
  params,
}: {
  params: Promise<{ tag: string[] }>;
}) {
  const { tag } = await params;

  const selectedTag = tag?.[0] ?? "all";

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, selectedTag],
    queryFn: () => fetchNotes(1, selectedTag === "all" ? "" : selectedTag),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient tag={""} />
    </HydrationBoundary>
  );
}
