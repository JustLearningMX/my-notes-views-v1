import styles from '../../css/footer/Footer.module.css';

export function Footer() {

    return (
        <footer className={styles.footer}>
            <p>
                &copy; 2023 - Hiram Chavez Lopez
            </p>
            <ul className={styles.footer__menu}>
                <li>
                    <a href="https://github.com/JustLearningMX" target="_blank" rel="noreferrer">
                        <p>Github</p>
                    </a>
                </li>
                <li>
                    <a href="https://hiramchavez.me/" target="_blank" rel="noreferrer">
                        <p>Portfolio</p>
                    </a>
                </li>
            </ul>
        </footer>
    );
}