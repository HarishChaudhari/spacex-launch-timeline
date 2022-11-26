import NavItem from '../NavItem/navitem'
import styles from './navbar.module.css'

export default function Navbar() {
    return (
        <>
            <nav className={styles.navbar}>
                <NavItem href="/" caption="Home" />
            </nav>
        </>
    )
}
