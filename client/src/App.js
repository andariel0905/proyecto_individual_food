import React from 'react';
import "./App.css";
import {Route, useLocation, Switch} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './views/Landing/Landing';
import Home from './views/Home/Home';
import Form from './views/Form/Form';
import CardDetail from './views/CardDetail/CardDetail';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from "./redux/actions";

function App() {
  const dispatch = useDispatch();
  useEffect(()=>(dispatch(actions.getAllRecipes())),[]);
  useEffect(() =>(dispatch(actions.getDiets())), []);
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar location={location.pathname}/>}
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/recipe/:id" component={CardDetail} />
        <Route exact path="/create" component={Form} />
      </Switch>
    </div>
  );
}

export default App;
