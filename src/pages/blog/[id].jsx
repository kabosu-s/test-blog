import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

import styles from '@/src/styles/Home.module.scss'
import { Links } from "@/src/components/Links";
import { client } from "@/libs/client";


export default function BlogId({ blog }) {
  return (
      <>
      <Head>
        <title>きじ</title>
        <meta name="description" content="About" />
      </Head>
    <main className={`${styles.main} ${inter.className}`}>
      <h1>{blog.title}</h1>
      <p>{blog.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
      />
      <Links></Links>
    </main>
    </>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};
