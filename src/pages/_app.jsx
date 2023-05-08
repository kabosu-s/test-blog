import '@/src/styles/globals.scss';
import { useRouter } from 'next/router';
import Custom404 from '@/src/pages/404';

export default function App({ Component, pageProps }) {
const router = useRouter();
 // 404ページのカスタムルーティング
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  if (router.isReady && !router.isFallback && Component === Custom404) {
    return <Custom404 />;
  }

  return <Component {...pageProps} />
}
