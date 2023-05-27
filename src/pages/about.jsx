import Head from 'next/head';
import Image from 'next/image';

import axios from 'axios';

import { Noto_Sans_JP } from 'next/font/google'
const notoSansJapanese = Noto_Sans_JP({
  weight: '400',
  preload: false,
})

import styles from '@/src/styles/Notfound.module.scss';
import { Footer } from '@/src/components/Footer';
import { Header } from '@/src/components/Header';

export default function Page ({data}) {
  if (!data || data.length === 0) {
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
      <div className={`${styles.main_visual}`}>
        {data.map((item) => (
          <div key={item.id}>
            <h1>{item.attributes.pagename}</h1>
            <div dangerouslySetInnerHTML={{ __html: item.attributes.content }} />
          </div>
        ))}
      </div>
      </main>
      <Footer />
    </>
  );
}


//データを読み込む
export async function getStaticProps() {
  try {
    // StrapiのエンドポイントURLを指定
    const apiUrl = 'https://strapi-production-65d6.up.railway.app/api/static-pages'; 

    // Strapiからデータを取得
    const response = await axios.get(apiUrl);
    // レスポンスのデータを取り出す
    const data = response.data?.data;

    console.log(data); // データの中身を確認

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error('Error fetching Strapi data:', error);
    return {
      props: {
        data: null, 
      },
    };
  }
}