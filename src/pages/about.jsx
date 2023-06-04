import Head from 'next/head';
import Image from 'next/image';

import axios from 'axios';

import { Noto_Sans_JP } from 'next/font/google'
const notoSansJapanese = Noto_Sans_JP({
  weight: '400',
  preload: false,
})

import styles from '@/src/styles/About.module.scss';
import { Footer } from '@/src/components/Footer';
import { Header } from '@/src/components/Header';

export default function Page ({posts, apiUrl}) {
  if (!posts || posts.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Head>
        <title>ABOUT｜QUIRKY GARBAGE</title>
        <meta name="description" content="Not found" />
      </Head>
      <Header />
      <main className={`${styles.main} ${notoSansJapanese.className}`}>
        {posts.map((post) => (
          <div key={post.id} className={`${styles.main_visual}`}>
          <Image
            src={`${post?.attributes?.viewimage?.data?.attributes?.url}`}
            width={226}
            height={150}
            alt=""
          />
          <h1>{post.attributes.pagename}</h1>
          <div className={`${styles.content}`} dangerouslySetInnerHTML={{ __html: post.attributes.content }} />
          </div>
        ))}
      </main>
      <Footer />
    </>
  );
}

//データを読み込む
export async function getStaticProps() {
  try {
    // StrapiのエンドポイントURLを指定
    const apiUrl = 'https://strapi-production-65d6.up.railway.app';
    // ローカル（画像のパスがホストからじゃないのでapiURLを渡すこと）
    // const apiUrl = 'http://localhost:1337';
    const endpoint = apiUrl + '/api/static-pages?populate=*'
    // Strapiからデータを取得
    const response = await axios.get(endpoint);
    // レスポンスのデータを取り出す
    const posts = response.data?.data;

    console.log(posts); // データの中身を確認
    return {
      props: {
        posts,
        apiUrl,
      },
    };
  } catch (error) {
    console.error('えらー！ fetching Strapi data:', error);
    return {
      props: {
        posts: [],
      },
    };
  }
}