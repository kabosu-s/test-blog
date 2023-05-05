import '@/src/styles/globals.scss'
import { Noto_Sans_JP } from 'next/font/google'
const notoSansJapanese = Noto_Sans_JP({
  weight: '400',
  preload: false,
})

export default function App({ Component, pageProps }) {
  return (
  <div className={`${notoSansJapanese.className}`}>
    <Component {...pageProps} />
  </div>
  )
}
