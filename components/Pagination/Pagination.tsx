"use client";

import * as ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";

import styles from "./Pagination.module.css";

// ВАЖЛИВО: ReactPaginateModule.default НЕ ІСНУЄ у Turbopack,
// тому ми дістаємо компонент через Object.values
const ReactPaginate = Object.values(ReactPaginateModule)[0] as ComponentType<ReactPaginateProps>;

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onChange(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={styles.pagination}
      activeClassName={styles.active}
      previousLabel="←"
      nextLabel="→"
    />
  );
}
