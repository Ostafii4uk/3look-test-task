import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import localFont from 'next/font/local'

const satoshi = localFont({
  src: [
    {
      path: '../../public/assets/fonts/Satoshi-Light.otf',
      weight: '300',
      style: 'light'
    },
    {
      path: '../../public/assets/fonts/Satoshi-Regular.otf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/assets/fonts/Satoshi-Medium.otf',
      weight: '500',
      style: 'medium'
    },
    {
      path: '../../public/assets/fonts/Satoshi-Bold.otf',
      weight: '700',
      style: 'bold'
    },
    {
      path: '../../public/assets/fonts/Satoshi-Black.otf',
      weight: '900',
      style: 'black'
    }
  ]
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={satoshi.className}>
      <Component {...pageProps} />
    </main>
  )
}
