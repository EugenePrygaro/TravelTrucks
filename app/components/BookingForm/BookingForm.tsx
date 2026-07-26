"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { createBookingRequest } from "@/lib/api/clientApi";
import css from "./BookingForm.module.css";
import toast from "react-hot-toast";

const BookingSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

interface BookingFormProps {
  camperId: string;
}

export default function BookingForm({ camperId }: BookingFormProps) {
  const mutation = useMutation({
    mutationFn: (values: { name: string; email: string }) =>
      createBookingRequest(values, camperId),
    onSuccess: () => {
      toast.success("Booking request sent successfully!");
    },
    onError: () => {
      toast.error("Failed to send booking request. Please try again.");
    },
  });

  return (
    <div className={css.formContainer}>
      <Formik
        initialValues={{ name: "", email: "" }}
        validationSchema={BookingSchema}
        onSubmit={(values, { resetForm }) => {
          mutation.mutate(values, {
            onSuccess: () => resetForm(),
          });
        }}
      >
        {({ errors, touched }) => (
          <Form className={css.form}>
            <div className={css.fieldWrapper}>
              {errors.name && touched.name && (
                <label className={css.errorLabel}>Name*</label>
              )}

              <Field
                type="text"
                name="name"
                placeholder="Name*"
                className={`${css.input} ${
                  errors.name && touched.name ? css.inputError : ""
                }`}
              />

              {errors.name && touched.name && (
                <span className={css.errorIcon}>!</span>
              )}

              <ErrorMessage
                name="name"
                component="span"
                className={css.errorMessage}
              />
            </div>
            <div className={css.fieldWrapper}>
              {errors.email && touched.email && (
                <label className={css.errorLabel}>Email*</label>
              )}

              <Field
                type="email"
                name="email"
                placeholder="Email*"
                className={`${css.input} ${
                  errors.email && touched.email ? css.inputError : ""
                }`}
              />

              {errors.email && touched.email && (
                <span className={css.errorIcon}>!</span>
              )}

              <ErrorMessage
                name="email"
                component="span"
                className={css.errorMessage}
              />
            </div>
            <button
              className={css.submitButton}
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Sending..." : "Send"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
