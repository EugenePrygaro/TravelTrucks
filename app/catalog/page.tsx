"use client";

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
        <FiltersSidebar
          innerRef={formikRef}
          onSearch={handleSearch}
          onReset={handleResetForm}
        />
      </div>
      <CamperList
        filters={appliedFilters}
        onClearFilters={handleResetForm}
        onViewAll={handleViewAll}
      />
    </div>
  );
}
