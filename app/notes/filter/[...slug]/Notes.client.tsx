"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import { fetchNotes } from "../../../../lib/api";

import SearchBox from "../../../../components/SearchBox/SearchBox";
import Pagination from "../../../../components/Pagination/Pagination";
import NoteList from "../../../../components/NoteList/NoteList";
import NoteForm from "../../../../components/NoteForm/NoteForm";
import Modal from "../../../../components/Modal/Modal";

export default function NotesClient({ tag }: { tag: string }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () => fetchNotes(page, search, tag),
    placeholderData: (prev) => prev,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError) return <p>Could not fetch the list of notes.</p>;

  return (
    <div>
      <SearchBox onSearch={debouncedSearch} />

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onChange={(newPage) => setPage(newPage)}
        />
      )}

      <button onClick={() => setIsModalOpen(true)}>Create note +</button>

      {notes.length > 0 && <NoteList notes={notes} />}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
