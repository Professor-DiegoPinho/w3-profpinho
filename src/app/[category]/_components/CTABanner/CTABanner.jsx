import EnrollmentButton from "@/app/[category]/_components/EnrollmentButton/EnrollmentButton";
import styles from "./CTABanner.module.css";

export default function CTABanner({
  category,
  firstPostSlug,
  accessType,
  requiresEnrollment,
  requiresPayment,
  checkoutUrl,
}) {
  return (
    <div className={styles.ctaBanner}>
      <p className={styles.ctaText}>
        Quer acessar todas as aulas? Inscreva-se para começar a aprender!
      </p>
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
