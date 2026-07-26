"use client";

import css from "./FiltersSidebar.module.css";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import Image from "next/image";
import { getFilters } from "@/lib/api/clientApi";
import { type Filters } from "@/types/filters";
import { useQuery } from "@tanstack/react-query";
import * as Yup from "yup";
import { formatLabel } from "@/lib/utils";

export type FilterValues = {
  location: string;
  form: string;
  transmission: string;
  engine: string;
};

export const initialValues: FilterValues = {
  location: "",
  form: "",
  transmission: "",
  engine: "",
};

export const filtersSchema = Yup.object().shape({
  location: Yup.string().trim().max(50, "Too long"),
});

interface FiltersSidebarProps {
  onSearch: (filters: FilterValues) => void;
  onReset: () => void;
  innerRef?: React.Ref<FormikProps<FilterValues>>;
}

export default function FiltersSidebar({
  onSearch,
  onReset,
  innerRef,
}: FiltersSidebarProps) {
  const {
    data: filters,
    isLoading,
    isError,
  } = useQuery<Filters>({
    queryKey: ["filters"],
    queryFn: () => getFilters(),
  });

  if (isLoading) return <div>Filters loading...</div>;
  if (isError || !filters) return <div>Loading error</div>;

  return (
    <Formik<FilterValues>
      innerRef={innerRef}
      initialValues={initialValues}
      validationSchema={filtersSchema}
      onSubmit={(values) => {
        onSearch(values);
      }}
    >
      {({ resetForm }) => (
        <Form>
          <div className={css.container}>
            <label htmlFor="location" className={css.label}>
              Location
            </label>
            <div className={css.inputWrapper}>
              <Image
                src="/icons/map.svg"
                alt="map icon"
                width={20}
                height={20}
                className={css.icon}
              />

              <Field
                type="text"
                name="location"
                id="location"
                placeholder="City"
                className={css.input}
              />
              <ErrorMessage name="location">
                {(msg) => <span className={css.errorMessage}>{msg}</span>}
              </ErrorMessage>
            </div>

            <h2 className={css.title}>Filters</h2>

            <fieldset className={css.fieldset}>
              <legend className={css.legend}>Camper form</legend>
              {filters.forms.map((formType) => (
                <label key={formType} className={css.radioLabel}>
                  <Field
                    type="radio"
                    name="form"
                    value={formType}
                    className={css.radioInput}
                  />
                  <span className={css.customRadio} />
                  <span className={css.labelText}>{formatLabel(formType)}</span>
                </label>
              ))}
            </fieldset>

            <fieldset className={css.fieldset}>
              <legend className={css.legend}>Engine</legend>
              {filters.engines.map((engine) => (
                <label key={engine} className={css.radioLabel}>
                  <Field
                    type="radio"
                    name="engine"
                    value={engine}
                    className={css.radioInput}
                  />
                  <span className={css.customRadio} />
                  <span className={css.labelText}>{formatLabel(engine)}</span>
                </label>
              ))}
            </fieldset>

            <fieldset className={css.fieldset}>
              <legend className={css.legend}>Transmission</legend>
              {filters.transmissions.map((trans) => (
                <label key={trans} className={css.radioLabel}>
                  <Field
                    type="radio"
                    name="transmission"
                    value={trans}
                    className={css.radioInput}
                  />
                  <span className={css.customRadio} />
                  <span className={css.labelText}>{formatLabel(trans)}</span>
                </label>
              ))}
            </fieldset>

            <div className={css.buttons}>
              <button type="submit" className={css.searchButton}>
                Search
              </button>
              <button
                type="button"
                className={css.resetButton}
                onClick={() => {
                  resetForm({ values: initialValues });
                  onReset();
                }}
              >
                <Image
                  src="/icons/ion_close-outline.svg"
                  alt="close icon"
                  width={24}
                  height={24}
                  className={css.closeIcon}
                />
                Clear filters
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
