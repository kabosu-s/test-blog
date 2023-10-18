
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/src/styles/Header.module.scss';

export function Header() {
  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.title}`}>
      <Image
          src="/img/img_logo.svg"
          width={100}
          height={160}
          alt="QUIRKY GARBAGE"
        />
      </div>
      <Link href="/">
      <div className={`${styles.title_text}`}>QUIRKY<br />GARBAGE</div>
      </Link>
      <div className={`${styles.openbtn}`}><span></span><span></span></div>
      <nav className={`${styles.nav} ${styles.active}`}>
        <Link href="/">HOME</Link>
        <Link href="/blog">BLOG</Link>
        <Link href="/notice">NOTICE</Link>
        <Link href="#">CONTACT</Link>
      </nav>
    </header>
  );
}
