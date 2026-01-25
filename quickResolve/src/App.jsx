import { useState ,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {useDispatch} from "react-redux"
import { Footer, Header, LogInForm, MiddleContainer, SigninForm  } from './components'
import {Outlet} from "react-router-dom"
import authService from './appwrite/auth'
import { login,logout } from './store/authSlice'

function App() {
  const [count, setCount] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
  authService.getCurrentUser()
    .then((user) => {
      if (user) {
        dispatch(login(user));
      } else {
        dispatch(logout());
      }
    });
}, []);

  return (
    <>
      <Header />
      
      <MiddleContainer>
       <Outlet/>
      </MiddleContainer>
      <Footer/>
    </>
  )
}

export default App
