import React from 'react'
import authService from '../appwrite/auth'
import Button from './Button';
import {useDispatch} from "react-redux"
import {logout} from "../store/authSlice"
function LogoutButton() {
    const dispatch = useDispatch();

    const onLogOUtButton = () =>{
        try {
            authService.logout().then(()=>{
            dispatch(logout())
                
            })

            
        } catch (error) {
            
        }
    }
  return (
    <Button onClick={onLogOUtButton} text='log out'/>
  )
}

export default LogoutButton