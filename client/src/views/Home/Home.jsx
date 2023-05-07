import CardsContainer from '../../components/CardsContainer/CardsContainer';
import styles from './Home.module.css';

const Home = () => {
    return (
        <div>
            <header className={styles.header}>
                <h2>Vea nuestras recetas</h2>
            </header>
            <CardsContainer/>
        </div>
    );
};
export default Home;