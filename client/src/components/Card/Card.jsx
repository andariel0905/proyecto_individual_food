import { Link } from 'react-router-dom';
import styles from './Card.module.css';

const Card = (props) => {
    return (
        <Link to={`/recipe/${props.id}`}>
            <div key={props.id} className={styles.card}>
                <img alt={props.title} src={props.image}/>
                <h3>{props.title}</h3>
                <p>HealthScore: {props.healthScore}</p>
                <p className={styles.dietsContainer}>{
                    props.diets.map((diet) => (
                        <span>{diet}</span>
                    ))
                }</p>
            </div>
        </Link>
    );
};

export default Card;