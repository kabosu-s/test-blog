import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Noto_Sans_JP } from 'next/font/google'
const notoSansJapanese = Noto_Sans_JP({
  weight: '400',
  preload: false,
})

import styles from '@/src/styles/Blog.module.scss';
// import { client } from '@/libs/client';
import { Footer } from '@/src/components/Footer';
import { Header } from '@/src/components/Header';

export async function generateStaticParams() {
    const contents = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/rcms-api/3/notices').then((res) => res.json())
    return contents.list.map((content) => ({
        slug: `${content.topics_id}`,
    }))
}
async function getData(slug) {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/rcms-api/3/notice/${slug}`);
    return res.json();
}

export default function Page(props) {
  const router = useRouter();
  const { slug } = router.query; // ルートのパラメータを取得

  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getData(slug);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    if (slug) {
      fetchData();
    }
  }, [slug]);
  return (
    <>
      <Head>
        <title>BLOG｜QUIRKY GARBAGE</title>
        <meta name="description" content="記事一覧です。" />
      </Head>
      <main className={`${styles.main} ${notoSansJapanese.className}`}>
       {data ? (
      <div>
          <h1>{data.details.subject}</h1>
          <div dangerouslySetInnerHTML={{ __html: data.details.ext_3 }} />
      </div>
       ) : (
          <p>Loading data...</p>
        )}
      </main>
    </>
  );
};

// 動的なページを作成
// const PER_PAGE = 4;
// export const getStaticPaths = async () => {
//   const repos = await client.get({ endpoint: "blog" });
//   const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);
//   const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => `/blog/page/${repo}`);
//   return { paths, fallback: false };
// };

// // データを取得
// export const getStaticProps = async (context) => {
//   const id = context.params.id;
//   const data = await client.get({ endpoint: "blog", queries: { offset: (id - 1) * 7, limit: 7 } });
//   return {
//     props: {
//       blogs: data.contents,
//       totalCount: data.totalCount
//     },
//   };
// };
