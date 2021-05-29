import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './navbar.scss';

const Navbar = props => {
    const takeMeHome = () => window.location.href = '/';

    return (
        <div className={styles.navbarContainer}>
            <p className={styles.title} onClick={takeMeHome}>The League</p>
            <div className={styles.navSection}>
                <NavLink exact to='/' activeClassName={styles.activeNavItem}>
                    <div className={styles.navBtn}>
                        Home
                    </div>
                </NavLink>
                <NavLink exact to='/fighters' activeClassName={styles.activeNavItem}>
                    <div className={styles.navBtn}>
                        Fighters
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default Navbar;
