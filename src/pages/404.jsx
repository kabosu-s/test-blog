import Head from 'next/head';
import Image from 'next/image';


import { Noto_Sans_JP } from 'next/font/google'
const notoSansJapanese = Noto_Sans_JP({
  weight: '400',
  preload: false,
})

import styles from '@/src/styles/Notfound.module.scss';
import { Footer } from '@/src/components/Footer';
import { Header } from '@/src/components/Header';

export default function Custom404 () {
  return (
    <>
      <Head>
        <title>404｜QUIRKY GARBAGE</title>
        <meta name="description" content="Not found" />
      </Head>
      <Header />
      <main className={`${styles.main} ${notoSansJapanese.className}`}>
      <div className={`${styles.main_visual}`}>
        <h1>Not Found</h1>
        <Image
          src="/img/img_broom.svg"
          width={300}
          height={400}
          alt=""
        />
        <p>なにもない。なにもない...</p>
      </div>
      </main>
      <Footer />
    </>
  );
}