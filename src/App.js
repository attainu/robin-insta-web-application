import React from 'react';
import NavBar from "./components/navbar"
import "./App.css"
import {BrowserRouter,Route} from 'react-router-dom'
import Home from './components/Display/Home'
import Signin from './components/Display/Signin'
import Profile from './components/Display/Profile'
import Signup from './components/Display/Signup'


function App() {
  return (
   <BrowserRouter>
     <NavBar/>
     <Route exact path="/" >
      <Home />
      </Route>
     <Route path ="/Signin">

        <Signin/>

     </Route>
      <Route path ="/Signup">

        <Signup/>

      </Route>
     <Route path ="/Profile">
       <Profile/>
     </Route>
     
     
   
   
   </BrowserRouter> 
    

  );
}

export default App;
