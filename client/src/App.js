import './App.css';
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Cards from './components/Cards/Cards';
import Form from './components/Form/Form';
import Detail from './components/Detail/Detail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Landing/>} path='/'/>
        <Route element={<Cards/>} path='/home'/>
        <Route element={<Form/>} path='/create'/>
        <Route element={<Detail/>} path='/detail/:id'/>
      </Routes>
    </div>
  );
}

export default App;
