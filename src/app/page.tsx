import styles from './page.module.css'
import RootProvider from '@/components/RootContext'
import CardList from '@/components/CardList'
import CardNew from '@/components/CardNew'
import CardTips from '@/components/CardTips'

export default function Home() {
  return (
    <main className={styles.main}>
      <RootProvider>
        <CardList />
        <CardNew />
        <CardTips />
      </RootProvider>
    </main>
  )
}
