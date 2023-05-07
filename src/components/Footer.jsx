import Image from 'next/image';
import Link from 'next/link';
import styles from '@/src/styles/Footer.module.scss';

export function Footer() {
  return (
      <footer className={`${styles.footer}`}>
        <nav className={`${styles.nav}`}>
          <Link href="/">HOME</Link>
          <Link href="/blog">BLOG</Link>
          <Link href="/about">ABOUT</Link>
          <Link href="/contact">CONTACT</Link>
        </nav>
        <div className={`${styles.sub}`}>
          <p>Author：Saeki</p>
        </div>
        <small>
        <Image
          src="/img/copyright.svg"
          width={1400}
          height={190}
          alt="© Garbage Base."
        />
        </small>
      </footer>
  );
}
