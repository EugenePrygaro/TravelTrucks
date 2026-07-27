"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import CamperList from "@/components/CamperList/CamperList";
import FiltersSidebar from "@/components/FiltersSidebar/FiltersSidebar";
import {
  type FilterValues,
  initialValues,
} from "@/components/FiltersSidebar/FiltersSidebar";
import css from "./Catalog.module.css";
import { type GetCampersParams } from "@/types/filters";
import { FormikProps } from "formik";

export default function CampersCatalog() {
  const [appliedFilters, setAppliedFilters] = useState<GetCampersParams>({});
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const formikRef = useRef<FormikProps<FilterValues>>(null);

  const handleSearch = (newFilters: FilterValues) => {
    const cleanedParams = Object.fromEntries(
      Object.entries(newFilters).filter(([_, value]) => value !== ""),
    ) as GetCampersParams;

    setAppliedFilters(cleanedParams);
  };

  const handleResetForm = () => {
    if (formikRef.current) {
      formikRef.current.resetForm({ values: initialValues });
    }
    setAppliedFilters({});
  };

  const handleViewAll = () => {
    setAppliedFilters({});
  };

  return (
    <div className={css.campersPage}>
      <div className={css.filters}>
        <button
          className={css.filterToggleButton}
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        >
          <span className={css.iconWrapper}>
            <Image
              src="/icons/filter.svg"
              alt="filter icon"
              width={24}
              height={24}
              className={`${css.icon} ${isFiltersOpen ? css.iconHidden : ""}`}
            />
            <Image
              src="/icons/filter-close.svg"
              alt="close icon"
              width={24}
              height={24}
              className={`${css.icon} ${!isFiltersOpen ? css.iconHidden : ""}`}
            />
          </span>
          Filters
        </button>

        <aside
          className={`${css.sidebarWrapper} ${isFiltersOpen ? css.open : ""}`}
        >
          <FiltersSidebar
            innerRef={formikRef}
            onSearch={handleSearch}
            onReset={handleResetForm}
          />
        </aside>
      </div>
      <CamperList
        filters={appliedFilters}
        onClearFilters={handleResetForm}
        onViewAll={handleViewAll}
      />
    </div>
  );
}
