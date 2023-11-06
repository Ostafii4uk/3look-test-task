import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

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

export const metadata: Metadata = {
  title: '3look.io – Test task',
  description: '3look.io – Test task',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={satoshi.className}>{children}</body>
    </html>
  )
}
