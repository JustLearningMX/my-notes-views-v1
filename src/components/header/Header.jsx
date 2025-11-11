import { NavLink } from 'react-router-dom';
import styles from '../../css/header/Header.module.css';

export function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.header__title}><p>App Notes</p></h1>
            <nav className={styles.header__nabvar}>
                <ul className={styles.header__nabvar_menu}>
                    <NavLink
                        to= "/"
                        state={{from: "MyNotes"}}
                        className={styles.nav_link}
                    >
                        My notes
                    </NavLink>
                    <NavLink
                        to= "/archived"
                        state={{from: "Archived"}}
                        className={styles.nav_link}
                    >
                        Archived notes
                    </NavLink>
                </ul>
            </nav>
        </header>
    );
}