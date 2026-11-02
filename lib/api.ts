import axios from "axios";
import type { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
}

// 🟢 ОНОВЛЕНА ФУНКЦІЯ — тепер приймає tag
export async function fetchNotes(
  page: number,
  search: string,
  tag?: string
): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = {
    page,
  };

  if (search) {
    params.search = search;
  }

  // ВАЖЛИВО: бекенд НЕ очікує tag="all"
  if (tag && tag !== "all") {
    params.tag = tag;
  }

  const response = await api.get<FetchNotesResponse>("", { params });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(`/${id}`);
  return response.data;
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const response = await api.post<Note>("", payload);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete<Note>(`/${id}`);
  return response.data;
}
