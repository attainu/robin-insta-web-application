import React, {useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/navbar'
import "./App.css"
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/Display/Home'
import Signin from './components/Display/Signin'
import Profile from './components/Display/Profile'
import Signup from './components/Display/Signup'
import CreatePost from './components/Display/CreatePost'
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './components/Display/UserProfile'
import Reset from './components/Display/Reset'

// context API
export const UserContext = createContext()

const Routing = () => {
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(typeof(user),user)
    if(user){
      dispatch({ type: "USER", payload: user })
    }else{
      if(!history.location.pathname.startsWith('/reset'))
          history.push('/signin')
    }
  },[])


  return (
    <Switch>
      <Route exact path="/" >
        <Home />
      </Route>
      <Route path="/Signin">

        <Signin />

      </Route>
      <Route path="/Signup">

        <Signup />

      </Route>
      <Route exact path="/Profile">
        <Profile />
      </Route>
      <Route path="/create">
        <CreatePost />
      </Route>
      <Route path="/Profile/:userid">
        <UserProfile />
      </Route>
      <Route path="/reset">
        <Reset />
      </Route>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <NavBar />
        <Routing />

      </BrowserRouter>
    </UserContext.Provider>

  );
}

export default App;
