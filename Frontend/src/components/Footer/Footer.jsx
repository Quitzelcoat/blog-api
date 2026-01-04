import styles from './Footer.module.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandBlock}>
          <span className={styles.logoDot} />
          <span className={styles.brandText}>Paperlane</span>
          <span className={styles.divider}>·</span>
          <span className={styles.text}>A calm space for writing.</span>
        </div>

        <p className={styles.copy}>
          © {year} Haris Saeed. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
