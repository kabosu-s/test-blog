import Head from 'next/head';
import Link from 'next/link';

import { Noto_Sans_JP } from 'next/font/google'
const notoSansJapanese = Noto_Sans_JP({
  weight: '400',
  preload: false,
})

import styles from '@/src/styles/Blog.module.scss';
import { client } from '@/libs/client';
import { Footer } from '@/src/components/Footer';
import { Header } from '@/src/components/Header';
import { Pagination } from '@/src/components/Pagination';

const PER_PAGE = 4;

export default function BlogPageId({ blogs, totalCount }) {
  return (
    <>
      <Head>
        <title>BLOG｜QUIRKY GARBAGE</title>
        <meta name="description" content="記事一覧です。" />
      </Head>
      <Header />
      <main className={`${styles.main} ${notoSansJapanese.className}`}>
        <div className={`${styles.article_list}`}>
        <div className={styles.main_visual}>
        <h1 className={styles.title}>Blog List</h1>
        <p>今ReactとNext.jsで作り直している。<br />
        昔の記事たち</p>
        </div>
          {blogs.map((blog) => (
            <div key={blog.id} className={`${styles.article}`}>
              <Link href={`/blog/${blog.id}`}>
              <img src={blog.mainimage.url} alt="" />
              <h2>{blog.title}</h2>
              <div className={`${styles.date}`}>{
              new Date(`${blog.publishedAt}`).toLocaleDateString()
              }</div>
              </Link>
            </div>
          ))}
        </div>
        <Pagination totalCount={totalCount} />
      </main>
      <Footer />
    </>
  );
};

// 動的なページを作成
export const getStaticPaths = async () => {
  const repos = await client.get({ endpoint: "blog" });
  const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);
  const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => `/blog/page/${repo}`);
  return { paths, fallback: false };
};

// データを取得
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", queries: { offset: (id - 1) * 4, limit: 4 } });
  return {
    props: {
      blogs: data.contents,
      totalCount: data.totalCount
    },
  };
};
