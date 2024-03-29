import Head from 'next/head';
import axios from 'axios';

import styles from '@/src/styles/Blog.module.scss';
import { Footer } from '@/src/components/Footer';
import { Header } from '@/src/components/Header';


export default function Page({ response }) {
  return (
    <>
      <Head>
        <title>{response.details.subject}｜QUIRKY GARBAGE</title>
        <meta name="description" content="個別記事" />
      </Head>
      <Header />
      <main className={`${styles.main}`}>
          <div className={`${styles.article_box}`}>
            <h1 className={`${styles.title}`}>{response.details.subject}</h1>
            <div className={`${styles.date}`}>{
              new Date(`${response.details.ymd}`).toLocaleDateString()
              }</div>
            <div className={`${styles.article_main}`} dangerouslySetInnerHTML={{ __html: response.details.ext_3 }} />
          </div>
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const { slug } = params;
    const response = await axios.get(`https://ekilabo.g.kuroco.app/rcms-api/3/notice/${slug}`);

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

