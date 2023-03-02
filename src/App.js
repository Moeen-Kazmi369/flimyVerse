import React, { useState } from 'react'
import Header from './Components/Header';
import Cards from './Components/Cards';
import AddMovie from './Components/AddMovie';
import {Route,Routes} from 'react-router-dom';
import Detials from './Components/Detials';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { createContext } from 'react';
const Appstate=createContext();
const App = () => {
  const [login,setLogin]=useState(false);
  const [userName,setUserName]=useState("");
  return (
    <Appstate.Provider value={{login,setLogin,userName,setUserName}}>
    <div className="relative">
      <Header/>
      <Routes>
        <Route path='/' element={<Cards/>}/>
        <Route path='/addmovie' element={<AddMovie/>}/>
        <Route path='/detial/:id' element={<Detials/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </div>
    </Appstate.Provider>
  );
}

export default App;
export {Appstate};