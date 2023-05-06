import Head from 'next/head';
import { client } from '@/libs/client';

import { load } from 'cheerio';
import hljs from 'highlight.js';
import 'highlight.js/styles/hybrid.css';

import styles from '@/src/styles/Article.module.scss';
import { Footer } from '@/src/components/Footer';
import { Header } from '@/src/components/Header';


export default function BlogId({ blog }) {
  return (
    <>
      <Head>
        <title>{`${blog.title} ｜QUIRKY GARBAGE`}</title>
        <meta name="description" content="個別記事" />
      </Head>
      <Header />
      <main className={`${styles.content}`}>
        <div className={`${styles.mv_img}`}>
          <img src={blog.mainimage.url} alt="" />
        </div>
        <h1 className={`${styles.title}`}>{`${blog.title}`}</h1>
        <div className={`${styles.date}`}>{
          new Date(`${blog.publishedAt}`).toLocaleDateString()
        }</div>
        <div className={`${styles.article_main}`}
          dangerouslySetInnerHTML={{
            __html: `${blog.content}`,
          }}
        />
        <div>
        {blog.tag}
        </div>
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
  // 本文にシンタックスハイライト追加
  const $ = load(data.body);
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass('hljs');
  });
  data.content = $.html();
  return {
    props: {
      blog: data,
    },
  };
};
