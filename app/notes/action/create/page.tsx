import type { Metadata } from "next";
import NoteForm from "../../../../components/NoteForm/NoteForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Create note — NoteHub",
  description: "Create a new note and save your progress with automatic draft storage.",
  openGraph: {
    title: "Create note — NoteHub",
    description: "Create a new note and save your progress with automatic draft storage.",
    url: "https://notehub.com/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create note page preview",
      },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
