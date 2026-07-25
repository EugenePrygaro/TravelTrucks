import css from "./LoadingModal.module.css";

export default function LoadingModal() {
  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <div className={css.spinner} />
        <p className={css.text}>Loading tracks...</p>
        <p className={css.subtext}>
          Please wait while we fetch the best travel trucks for you
        </p>
      </div>
    </div>
  );
}
