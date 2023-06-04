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
// import { Pagination } from '@/src/components/Pagination';


export default function Home({ blogs }) {

const [searchQuery, setSearchQuery] = useState('');
const [searchResults, setSearchResults] = useState([]);
const handleSearch = async (e) => {
    e.preventDefault();
    // ブログ記事を検索するAPIなどを呼び出す
    const searchResults = await searchBlogPosts(searchQuery);
    // 検索結果をセットする
    setSearchResults(searchResults);
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
                {/* 検索フォーム */}
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit">検索</button>
                </form>
            </div>
            <div>
            {/* 検索結果 */}
            {searchResults && searchResults.length > 0 ? (
              searchResults.map((post) => (
                <div key={post.pagename}>
                    <h2>{post.pagename}</h2>
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
              ))
            ) : (
              <div>検索結果が見つかりませんでした。</div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

// 記事を検索する
const searchBlogPosts = async (query) => {
  try {
    // 記事のデータを取得
    const apiUrl = 'https://strapi-production-65d6.up.railway.app';
    // const apiUrl = 'http://localhost:1337';
    const endpoint = apiUrl + '/api/static-pages?populate=*';
    // Strapiからデータを取得
    const response = await axios.get(endpoint);
    // レスポンスのデータを取り出す
    const data = response.data?.data;
// レスポンスのデータがオブジェクト形式の場合、配列に変換してからフィルタリング
const filteredResults = Object.values(data).map((item) => item.attributes).filter((post) => {
  const titleMatches = post?.pagename?.toLowerCase().includes(query.toLowerCase());
  const contentMatches = post?.content?.toLowerCase().includes(query.toLowerCase());

  // タイトルまたは内容にクエリが含まれる記事を抽出
  return titleMatches || contentMatches;
});

    return filteredResults;
  } catch (error) {
    console.error('Error searching blog posts:', error);
    return [];
  }
};
