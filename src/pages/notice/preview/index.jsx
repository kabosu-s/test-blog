import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';

import styles from '@/src/styles/Blog.module.scss';
import { Footer } from '@/src/components/Footer';
import { Header } from '@/src/components/Header';

export default function Page({ response }) {
  if (!response || !response.details) {
    // エラーが発生した場合やデータが存在しない場合の処理
    return <div>Error: Data not available</div>;
  }
  return (
    <>
      <Head>
        <title>{response.details.subject}｜QUIRKY GARBAGE</title>
        <meta name="description" content="個別記事" />
      </Head>
      <Header />
      <main className={`${styles.main}`}>
    <div>
      <h1 className="title">{response.details.subject}</h1>
      <div className="post" dangerouslySetInnerHTML={{ __html: response.details.ext_3 }} />
    </div>
      </main>
      <Footer />
    </>
  );
}


export async function getServerSideProps({ query }) {
  try {
    const { preview_token } = query;
    const response = await axios.get(`https://ekilabo.g.kuroco.app/rcms-api/4/notice/preview`, {
      params: {
        preview_token,
      },
    });

    return {
      props: {
        response: response.data,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        response: {},
      },
    };
  }
}

