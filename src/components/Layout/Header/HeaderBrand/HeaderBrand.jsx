'use client';

import Link from 'next/link';
import styles from './HeaderBrand.module.css';

export default function HeaderBrand() {
  return (
    <div className={styles.brand}>
      <Link href="/" className={styles.logo}>
        <img
          src="/diegopinho-learninghub-logo.svg"
          alt="Learning Hub Logo"
          className={styles.logoImage}
        />
      </Link>
    </div>
  );
}
