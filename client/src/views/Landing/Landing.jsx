import {Link} from 'react-router-dom';

const Landing = () => {
    return (
        <div>
            <div>
                <h2>Bienvenido a</h2>
                <h1>Henry Food</h1>
                <Link to='/home'>Ingresar</Link>
            </div>
        </div>
    )
};
export default Landing;