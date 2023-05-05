import Head from 'next/head';
import Image from 'next/image';

import styles from '@/src/styles/Home.module.scss';
import { Footer } from '@/src/components/Footer';
import { Header } from '@/src/components/Header';
import { client } from '@/libs/client';

export default function BlogId({ blog }) {
  return (
    <>
      <Head>
        <title>{blog.title}｜QUIRKY GARBAGE</title>
        <meta name="description" content="個別記事" />
      </Head>
      <Header />
      <main className={`${styles.main}`}>
        <h1>{blog.title}</h1>
        <p>{blog.publishedAt}</p>
        <div
          dangerouslySetInnerHTML={{
            __html: `${blog.body}`,
          }}
        />
      </main>
      <Footer />
    </>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: 'blog' });
  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: 'blog', contentId: id });
  return {
    props: {
      blog: data,
    },
  };
};
