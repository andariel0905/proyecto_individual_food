import { Link } from 'react-router-dom';

const Card = (props) => {
    return (
        <Link to={`/recipe/${props.id}`}>
            <div key={props.id}>
                <img src={props.image}/>
                <h3>{props.title}</h3>
                <p>HealthScore: {props.healthScore}</p>
                <p>Diets:</p>
                {
                props.diets.map((diet) => (
                    <span>{diet}</span>
                ))
                }
            </div>
        </Link>
    );
};

export default Card;