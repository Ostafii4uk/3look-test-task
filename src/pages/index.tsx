import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Categories from '@/components/Categories/Categories'

export default function Home() {
  return (
    <div className={`${styles.home} `}>
      <Categories />
    </div>
  )
}
