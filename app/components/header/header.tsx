import Image from 'next/image'
import Link from 'next/link'
import styles from './header.module.css'
import Navbar from './Navbar/navbar'

export default function Header() {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.logo_wrapper}>
                    {/* <a
                        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    > */}
                        <span className="logo">
                            <h1 className={styles.title}>
                                <Link href="/">SpaceX Launch Timeline</Link>
                            </h1>
                        </span>
                    {/* </a> */}
                </div>
                
                <Navbar/>
                
            </header>
        </>
    )
}
