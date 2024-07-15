import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { Noto_Sans_JP } from 'next/font/google';
import { Footer } from '@/src/components/Footer';
import { Header } from '@/src/components/Header';
import Pagination from '@/src/components/Kurokopagination';

import styles from '@/src/styles/Blog.module.scss';

const notoSansJapanese = Noto_Sans_JP({
  weight: '400',
  preload: false,
});

export default function Page({ response, page, totalPages }) {
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
          {response.map((n, index) => (
            <div key={index} className={`${styles.article}`}>
              <Link href={`/notice/${n.topics_id}`}>
                <h2>{n.subject}</h2>
                <div className={`${styles.date}`}>
                  {new Date(`${n.ymd}`).toLocaleDateString()}
                </div>
              </Link>
            </div>
          ))}
        </div>
        <Pagination page={page} totalPages={totalPages} />
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps({ params, query }) {
  try {
    const page = parseInt(query.page) || 1; // クエリパラメータからページ番号を取得
    const pageSize = 1; // ページあたりの記事数
    

    const response = await axios.get('https://ekilabo.g.kuroco.app/rcms-api/3/notices');
    const totalItems = response.data.list.length;


    // ページネーションを考慮して記事をフィルタリング
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const filteredResponse = response.data.list.slice(startIndex, endIndex);

    // ページ番号と総ページ数を計算
    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      props: {
        response: filteredResponse,
        page,
        totalPages,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        response: [],
        page: 1,
        totalPages: 1,
      },
    };
  }
}
