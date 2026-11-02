"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../../../lib/api";
import NoteList from "../../../../components/NoteList/NoteList";
import styles from "../../../../components/NoteList/NoteList.module.css";

export default function NotesClient({ tag }: { tag: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", 1, tag],
    queryFn: () => fetchNotes(1, "", tag),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Something went wrong.</p>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.actions}>
        <Link href="/notes/action/create" className={styles.createButton}>
          Create note
        </Link>
      </div>

      <NoteList notes={data.notes} />
    </div>
  );
}
