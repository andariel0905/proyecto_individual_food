import React from 'react';
import {Route, useLocation, Switch} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './views/Landing/Landing';
import Home from './views/Home/Home';
import Form from './views/Form/Form';
import CardDetail from './views/CardDetail/CardDetail';

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar/>}
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
