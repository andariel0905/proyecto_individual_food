import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

const NavBar = (props) => {
    return (
        <nav className={styles.navBar}>
            <h2>Henry Foods</h2>
            {
                props.location === "/create" ?
                    <Link to='/home' className={styles.link}>Volver</Link> 
                    :
                    props.location === "/home" ?
                        <Link to='/create' className={styles.link}>Crear una receta</Link> 
                        :
                        <>
                            <Link to='/home' className={styles.link}>Volver</Link>
                            <Link to='/create' className={styles.link}>Crear una receta</Link>
                        </>
            }

        </nav>
    )
};

export default NavBar;