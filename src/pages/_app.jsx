import { useEffect } from 'react'
import { useRouter } from 'next/router'

import '@/src/styles/globals.scss'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      window.dataLayer = window.dataLayer || []
      function gtag() {
        dataLayer.push(arguments)
      }
      gtag('js', new Date())
      gtag('config', 'GTM-NQ53ZCB')
    })
  }, [])

  return <Component {...pageProps} />
}
