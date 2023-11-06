import styles from './page.module.css'
import Button from '@/components/Button/Button'

export default function Home() {
  return (
    <main className={styles.main}>
      <Button type='create' />
    </main>
  )
}
