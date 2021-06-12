import * as React from 'react'
import { useState } from 'react'
import { 
  BrowserRouter as Router, 
  Route, 
  Link, 
  Redirect, 
  useLocation, 
  useHistory 
} from 'react-router-dom'
import Public from './pages/public'
import Private from './pages/private'

function App() {

const [isAuthenticated, setIsAuthenticated] = useState(false)
const [redirectToReferrer, setRedirectToReferrer] = useState(false)

function Login () {
  const { state } = useLocation()

  const login = () => {
    setIsAuthenticated(true)
    setRedirectToReferrer(true)
  }

  if(redirectToReferrer === true){
    return <Redirect to={state?.from || '/'}/>
  }

  return(
    <div>
      <p>Please Login</p>
      <button onClick={login}>Log in</button>
    </div>
  )
}

function PrivateRoute({children, ...rest}){
  return(
    <Route {...rest} render={({ location }) => {
      return isAuthenticated === true
      ? children
      : <Redirect to={{
        pathname: '/login',
        state: {from: location}
      }} />
    }} />
  )
}

function AuthButton () {
  const history = useHistory()
  
  return isAuthenticated === true
    ? <p>
        Welcome! <button onClick={() => {
          setIsAuthenticated(false)
          setRedirectToReferrer(false)
          history.push('/login')
        }}>Sign out</button>
      </p>
    : <p>You are not logged in.</p>
}


  return (
    <Router>
      <div>
        <AuthButton/>
        <ul>
          <li><Link to='/public'>Public Page</Link></li>
          <li><Link to='/protected'>Protected Page</Link></li>
        </ul>
        <Route path='/public'>
          <Public/>
        </Route>
        <Route path='/login'>
          <Login/>
        </Route>
        <PrivateRoute path='/protected'>
          <Private/>
        </PrivateRoute>
      </div>
    </Router>
  );
} 

export default App
