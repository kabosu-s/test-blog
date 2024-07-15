import Head from 'next/head';
import Link from 'next/link';

import { client } from '@/libs/client';
import Image from 'next/image';
import { load } from 'cheerio';
import hljs from 'highlight.js';
import 'highlight.js/styles/hybrid.css';

import styles from '@/src/styles/Article.module.scss';
import { Footer } from '@/src/components/Footer';
import { Header } from '@/src/components/Header';

export default function BlogId({ blog, tags, prev, next }) {
  return (
    <>
      <Head>
        <title>{`${blog.title} ｜QUIRKY GARBAGE`}</title>
        <meta name="description" content="個別記事" />
      </Head>
      <Header />
      <main className={`${styles.main}`}>
        <div className={`${styles.article_box}`}>
          <div className={`${styles.mv_img}`}>
          <Image src={`${blog.mainimage.url}`} width={1200} height={600} alt="" decoding="async" loading="lazy" />
          </div>
          <h1 className={`${styles.title}`}>{`${blog.title}`}</h1>
          <div className={`${styles.date}`}>{new Date(`${blog.publishedAt}`).toLocaleDateString()}</div>
          <div
            className={`${styles.article_main}`}
            dangerouslySetInnerHTML={{
              __html: `${blog.content}`,
            }}
          />

          <nav className={`${styles.pagenav}`}>
            {prev && (
              <Link href={`/blog/${prev.id}`} className={`${styles.prev}`}>
                <dl>
                  <dt>
                    <span>前の記事</span>
                    {prev.title}
                  </dt>
                  <dd className={`${styles.img_box}`}>
                  <Image src={`${prev.mainimage.url}`} width={1200} height={600} alt="" decoding="async" loading="lazy" />
                  </dd>
                </dl>
              </Link>
            )}
            {next && (
              <Link href={`/blog/${next.id}`} className={`${styles.next}`}>
                <dl>
                  <dt>
                    <span>次の記事</span>
                    {next.title}
                  </dt>
                  <dd className={`${styles.img_box}`}>
                    <Image src={`${next.mainimage.url}`} width={1200} height={600} alt="" decoding="async" loading="lazy" />
                  </dd>
                </dl>
              </Link>
            )}
          </nav>
        </div>
        <div className={`${styles.tag_box}`}>
          <h2>CATEGORY</h2>
          <ul>
            {tags.map((tag) => (
              <li key={tag.id}>
                <Link href={`/blog/tags/${tag.id}`}>{tag.name}</Link>
              </li>
            ))}
          </ul>
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
  const tagData = await client.get({ endpoint: 'tags' });

  // 本文にシンタックスハイライト追加
  const $ = load(data.body);
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass('hljs');
  });
  data.content = $.html();

  // ページデータを取得
  const pageDataResponse = await client.get({ endpoint: 'blog', queries: { limit: 100, fields: 'id,title,mainimage' } });
  const pageData = pageDataResponse.contents; //配列形式にする
  // slugに基づいてprevとnextを取得
  const index = pageData.findIndex((content) => content.id === id);
  const prev = index > 0 ? pageData[index - 1] : null; //なかったらnullにする
  const next = index < pageData.length - 1 ? pageData[index + 1] : null;

  return {
    props: {
      blog: data,
      tags: tagData.contents,
      prev: prev || null,
      next: next || null,
    },
  };
};
