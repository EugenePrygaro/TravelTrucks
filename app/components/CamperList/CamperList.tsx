"use client";

import { useEffect, useRef } from "react";
import CamperCard from "@/components/CamperCard/CamperCard";
import LoadingModal from "@/components/LoadingModal/LoadingModal";
import EmptyState from "@/components/EmptyState/EmptyState";
import { getCampers } from "@/lib/api/clientApi";
import type { CampersResponse } from "@/types/camper";
import { useInfiniteQuery } from "@tanstack/react-query";
import css from "./CamperList.module.css";
import { toast } from "react-hot-toast";
import { type GetCampersParams } from "@/types/filters";

interface CamperListProps {
  filters: GetCampersParams;
  onClearFilters: () => void;
  onViewAll: () => void;
}

export default function CamperList({
  filters,
  onClearFilters,
  onViewAll,
}: CamperListProps) {
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
    queryKey: ["campers", filters],
    queryFn: ({ pageParam }) =>
      getCampers({ page: pageParam as number, perPage: 4, ...filters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage.total / 4);
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
  });

  const pageCount = data?.pages.length || 0;
  const campersList = data?.pages.flatMap((page) => page.campers) || [];
  const isEmpty = !isLoading && campersList.length === 0;

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
      toast.error("Loading campers error, please try again later");
    }
  }, [isError, error]);

  if (isLoading) return <LoadingModal />;

  return (
    <div className={css.content}>
      {isEmpty && !isError ? (
        <EmptyState onClearFilters={onClearFilters} onViewAll={onViewAll} />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
