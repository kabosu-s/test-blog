import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import styles from '@/src/styles/Home.module.scss'
import { Links } from "@/src/components/Links";
import { client } from "@/libs/client";


export default function Home({ blog }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="テスト" />
      </Head>
      <main className={`${styles.main}`}>
        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>pages/index.js</code>
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

<ul>
 {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
</ul>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>
        <Links />
      </main>
    </>
  )
}


export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });

  return {
    props: {
      blog: data.contents,
    },
  };
};