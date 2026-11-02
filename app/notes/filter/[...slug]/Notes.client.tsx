"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../../../lib/api";
import NoteList from "../../../../components/NoteList/NoteList";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import Pagination from "../../../../components/Pagination/Pagination";
import styles from "../../../../components/NoteList/NoteList.module.css";

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input
  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // reset page when search changes
    }, 300);

    return () => clearTimeout(id);
  }, [search]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, tag, debouncedSearch],
    queryFn: () => fetchNotes(page, debouncedSearch, tag),
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  if (isLoading) {
    return <p className={styles.message}>Loading...</p>;
  }

  if (isError || !data) {
    return <p className={styles.message}>Something went wrong.</p>;
  }

  const hasNotes = data.notes && data.notes.length > 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <SearchBox value={search} onChange={handleSearchChange} />

        <Link href="/notes/action/create" className={styles.createButton}>
          Create note
        </Link>
      </div>

      {hasNotes ? (
        <>
          <NoteList notes={data.notes} />

          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onChange={handlePageChange}
          />
        </>
      ) : (
        <p className={styles.message}>No notes found.</p>
      )}
    </div>
  );
}
