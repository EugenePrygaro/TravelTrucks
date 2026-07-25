"use client";

import { useEffect, useRef } from "react";
import CamperCard from "@/components/CamperCard/CamperCard";
import { getCampers } from "@/lib/api/clientApi";
import type { CampersResponse } from "@/types/camper";
import { useInfiniteQuery } from "@tanstack/react-query";
import css from "./CamperList.module.css";
import { toast } from "react-hot-toast";

export default function CamperList() {
  const lastElementRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isError,
    error,
  } = useInfiniteQuery<CampersResponse>({
    queryKey: ["campers"],
    queryFn: ({ pageParam }) =>
      getCampers({ page: pageParam as number, perPage: 4 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage.total / 4);
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
  });

  const pageCount = data?.pages.length || 0;

  useEffect(() => {
    if (!isFetchingNextPage && pageCount > 1) {
      lastElementRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [pageCount, isFetchingNextPage]);

  useEffect(() => {
    if (isError) {
      toast.error(
        error?.message || "Loading camper error, please try again later",
      );
    }
  }, [isError, error]);

  if (isLoading) return <p className={css.loading}>Loading campers...</p>;

  return (
    <div className={css.container}>
      <div className={css.list}>
        {data?.pages.map((page, i) => {
          const isLastPage = i === pageCount - 1 && i > 0;

          return (
            <div
              key={i}
              className={css.pageGroup}
              ref={isLastPage ? lastElementRef : null}
            >
              {page.campers.map((camper) => (
                <CamperCard key={camper.id} {...camper} />
              ))}
            </div>
          );
        })}
      </div>

      {hasNextPage && (
        <button
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className={css.loadMoreBtn}
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}
