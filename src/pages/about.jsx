import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Noto_Sans_JP } from 'next/font/google'
const notoSansJapanese = Noto_Sans_JP({
  weight: '400',
  preload: false,
})

import styles from '@/src/styles/About.module.scss';
import { Footer } from '@/src/components/Footer';
import { Header } from '@/src/components/Header';

async function getData() {
  const res = await fetch('https://ekilabo.g.kuroco.app/rcms-api/3/notices');
  return res.json();
}


export default function Page() {

const [data, setData] = useState({ list: [] });
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
    {data.list.map((n) => (
        <div key={n.slug}>
          <Link href={`/notice/${n.topics_id}`}>
            {n.ymd} {n.subject}
          </Link>
        </div>
      ))}
    </>
  );
}

//データを読み込む
// export async function getStaticProps() {
//   try {
//     // エンドポイントURLを指定
//     const apiUrl = 'https://ekilabo.g.kuroco.app';
//     const endpoint = apiUrl + '/rcms-api/3/notices'
//     // データを取得
//     const response = await axios.get(endpoint);
//     // レスポンスのデータを取り出す
//     const posts = response.data?.data;

//     console.log(posts); // データの中身を確認
    

// return res.json();

//   } catch (error) {
//     console.error('えらー！ fetching Strapi data:', error);
//     return {
//       props: {
//         posts: [],
//       },
//     };
//   }
// }