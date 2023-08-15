import Head from 'next/head';
import Link from 'next/link';

import axios from 'axios';
import { useState } from 'react';

import { Noto_Sans_JP } from 'next/font/google'
const notoSansJapanese = Noto_Sans_JP({
  weight: '400',
  preload: false,
})

import styles from '@/src/styles/Blog.module.scss';
import { Footer } from '@/src/components/Footer';
import { Header } from '@/src/components/Header';


export default function Home({ blogs }) {

  const [keyword, setKeyword] = useState("");
  const [searchResults, setBlogs] = useState([]);
  const handleSearch = async () => {
    // 検索APIにリクエストを送信
    const res = await axios.get('/api/search', {
      params: {
        keyword,
      },
    });
    // 検索結果をセット
    setBlogs(res.data.contents);
  };

  return (
    <>
      <Head>
        <title>SEARCH｜QUIRKY GARBAGE</title>
        <meta name="description" content="SEARCH" />
      </Head>
      <Header />
      <main className={`${styles.main} ${notoSansJapanese.className}`}>
        <div className={`${styles.article_list}`}>
            <div className={styles.main_visual}>
              <h1 className={styles.title}>SEARCH</h1>
              <p>ブログのフリーワード検索</p>
            </div>
            <div className={`${styles.article}`}>
                {/* 検索フォーム */}
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button onClick={handleSearch} type="submit">検索</button>
            </div>
            {/* 検索結果 */
            searchResults && searchResults.length > 0 ? (
            searchResults.map((blog) => (
              <div key={blog.id} className={`${styles.article}`}>
                <Link href={`/blog/${blog.id}`}>
                <img src={blog.mainimage.url} alt="" />
                <h2>{blog.title}</h2>
                <div className={`${styles.date}`}>{
                new Date(`${blog.publishedAt}`).toLocaleDateString()
                }</div>
                </Link>
              </div>
              ))
            ) : (
              <div className={`${styles.article}`}>検索結果が見つかりませんでした。</div>
            )}
          </div>
      </main>
      <Footer />
    </>
  );
};


