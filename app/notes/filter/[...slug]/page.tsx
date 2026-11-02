import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "../../../../lib/getQueryClient";
import { fetchNotes } from "../../../../lib/api";
import NotesClient from "./Notes.client";

export default async function FilteredNotesPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  const tag = slug?.[0] ?? "all";

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () => fetchNotes(1, "", tag),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
