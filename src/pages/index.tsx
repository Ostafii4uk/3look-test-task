import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Categories from '@/components/Categories/Categories'

export default function Home() {
  return (
    <>
      <Head>
        <title>3look.io – Test Task</title>
      </Head>
      <div className={`${styles.home} `}>
        <Categories />
      </div>
    </>
    
  )
}
