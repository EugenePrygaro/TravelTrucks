import styles from "./LoadingModal.module.css";

interface LoadingModalProps {
  children?: React.ReactNode;
}

export default function LoadingModal({ children }: LoadingModalProps) {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.spinner} />
        {children ? (
          <>{children}</>
        ) : (
          <p className={styles.defaultText}>Loading, please wait...</p>
        )}
      </div>
    </div>
  );
}
