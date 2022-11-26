import Image from 'next/image'
import styles from './page.module.css'


export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* <h1 className={styles.title}>
          <a href="https://nextjs.org">SpaceX Launch Timeline</a>
        </h1> */}

        {/* <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>app/page.tsx</code>
        </p> */}

        <div className={styles.grid}>
            <a href="#" className={styles.card}>
                <h2>Add Event Node &rarr;</h2>
                <p>Add event node in timeline</p>
            </a>

            <a href="#" className={styles.card}>
                <h2>Set Lanuch Time &rarr;</h2>
                <p>For T- and T+ will be calculation.</p>
            </a>

            <a href="#" className={styles.card}>
                <h2>Timeline Zoom &rarr;</h2>
                <p>Zoom in or Zoom Out the timeline.</p>
            </a>

            <a href="#" className={styles.card}>
                <h2>Altitude Interval &rarr;</h2>
                <p>Rate for Altitude calculation /sec.</p>
            </a>
        </div>
      </main>
    </div>
  )
}
