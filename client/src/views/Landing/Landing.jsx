import styles from "./Landing.module.css";
import {Link} from 'react-router-dom';

const Landing = () => {
    return (
        <div className={styles.landing}>
            <div className={styles.container}>
                <p>Bienvenido a</p>
                <h1>Henry Food</h1>
                <Link to='/home' className={styles.link}>Ingresar</Link>
            </div>
        </div>
    )
};
export default Landing;