import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';


import { Noto_Sans_JP } from 'next/font/google'
const notoSansJapanese = Noto_Sans_JP({
  weight: '400',
  preload: false,
})

import styles from '@/src/styles/Home.module.scss';
import { Footer } from '@/src/components/Footer';
import { Header } from '@/src/components/Header';

export default function Home() {
  return (
    <>
      <Head>
        <title>QUIRKY GARBAGE</title>
        <meta name="description" content="テスト" />
      </Head>
      <Header />
      <main className={`${styles.main} ${notoSansJapanese.className}`}>
      <div className={`${styles.main_visual}`}>
      Next.jsにしてみたよー
      </div>
      <div className={`${styles.content}`}>
        <h1>ABOUT</h1>
        <p> Vue-CliとHeadlessCMSの勉強を兼ねてのブログ<br /> 目的なく、色々改造しながら気ままに続けてみます。 </p>
      </div>
      </main>
      <Footer />
    </>
  );
}