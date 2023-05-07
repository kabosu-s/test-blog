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


export default function BlogPageId({ blogs }) {

  if ( blogs.length === 0) {
    return (
        <>
      <Head>
        <title>BLOG｜QUIRKY GARBAGE</title>
        <meta name="description" content="記事一覧です。" />
      </Head>
      <Header />
      <main className={`${styles.main} ${notoSansJapanese.className}`}>
        <div>ブログコンテンツがありません</div>
      </main>
      <Footer />
    </>
    );
  }

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
        <h1 className={styles.title}>TAG</h1>
        <p>タグ別一覧</p>
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
      </main>
      <Footer />
    </>
  );
};

// 動的なページを作成
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "tags" });
  const paths = data.contents.map((content) => `/blog/tags/${content.id}`);
  return { paths, fallback: false };
};

// データを取得
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", queries: { filters: `tags[equals]${id}` } });
  return {
    props: {
      blogs: data.contents,
    },
  };
};
