import Link from 'next/link'
import styles from './navitem.module.css'

interface NavItemProps {
    href: string;
    caption: string;
}

export default function NavItem({ href, caption }: NavItemProps) {
    return (
        <>
            <Link className={`${styles.navitem}`}  href={href}>
                {caption}
            </Link>
        </>
    )
}