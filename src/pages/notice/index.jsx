import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';

import { Noto_Sans_JP } from 'next/font/google';
const notoSansJapanese = Noto_Sans_JP({
  weight: '400',
  preload: false,
});

import styles from '@/src/styles/Blog.module.scss';
import { Footer } from '@/src/components/Footer';
import { Header } from '@/src/components/Header';

export default function Page({ response }) {
  return (
    <>
      <Head>
        <title>お知らせ｜QUIRKY GARBAGE</title>
        <meta name="description" content="お知らせ一覧です。" />
      </Head>
      <Header />
      <main className={`${styles.main} ${notoSansJapanese.className}`}>
        <div className={`${styles.article_list}`}>
        <div className={styles.main_visual}>
        <h1 className={styles.title}>Notice List</h1>
        <p>kuroko使ってお知らせ一覧</p>
        </div>
          {response.list.map((n,index) => (
            <div key={index} className={`${styles.article}`}>
              <Link href={`/notice/${n.topics_id}`}>
              <h2>{n.subject}</h2>
              <div className={`${styles.date}`}>{
              new Date(`${n.ymd}`).toLocaleDateString()
              }</div>
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
export async function getServerSideProps() {
  try {
    const response = await axios.get('https://ekilabo.g.kuroco.app/rcms-api/3/notices');
    return {
      props: {
        response: response.data,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        response: { list: [] },
      },
    };
  }
}