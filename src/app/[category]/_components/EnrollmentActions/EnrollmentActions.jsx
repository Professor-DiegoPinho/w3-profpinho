import EnrollmentButton from "@/app/[category]/_components/EnrollmentButton/EnrollmentButton";
import styles from "./EnrollmentActions.module.css";

export default function EnrollmentActions({
  category,
  firstPostSlug,
  accessType,
  requiresEnrollment,
  requiresPayment,
  checkoutUrl,
}) {
  return (
    <div className={styles.actions}>
      <EnrollmentButton
        category={category}
        firstPostSlug={firstPostSlug}
        accessType={accessType}
        requiresEnrollment={requiresEnrollment}
        requiresPayment={requiresPayment}
        checkoutUrl={checkoutUrl}
      />
    </div>
  );
}
