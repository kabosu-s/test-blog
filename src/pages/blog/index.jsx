import Head from 'next/head';
import Image from 'next/image';
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

export default function Home({ blog }) {
  return (
    <>
      <Head>
        <title>BLOG｜QUIRKY GARBAGE</title>
        <meta name="description" content="テスト" />
      </Head>
      <Header />
      <main className={`${styles.main} ${notoSansJapanese.className}`}>
        <div className={`${styles.article_list}`}>
        <div className={styles.main_visual}>
        <h1 className={styles.title}>Blog List</h1>
        <p>Vue勉強がてら色々作ってみたので飽きるまで頑張るブログ。<br />
        を…今ReactとNext.jsで作り直している。</p>
        </div>
          {blog.map((blog) => (
            <div key={blog.id} className={`${styles.article}`}>
              <Link href={`/blog/${blog.id}`}>
              <img src={blog.mainimage.url} alt="" />
              <h2>{blog.title}</h2>
              <div className={`${styles.date}`}>{blog.publishedAt}</div>
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: 'blog' });
  return {
    props: {
      blog: data.contents,
    },
  };
};
