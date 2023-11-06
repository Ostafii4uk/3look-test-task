import CustomHeader from '@/components/CustomHeader/CustomHeader'
import { ReactNode } from 'react'
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

interface MyProps {
  children?: ReactNode;
}

export default function Layout({ children }: MyProps) {
  return (
    <>
      <CustomHeader />
      <main className={satoshi.className}>{children}</main>
    </>
  )
}