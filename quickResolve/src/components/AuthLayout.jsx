import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function AuthLayout({children , authentication = true}) {
    const navigate = useNavigate()
    const [loader , setLoader] = useState(true)

    const authStatus = useSelector(state => state.auth.status)
    useEffect(()=>{
        if (authStatus && authStatus !== authentication) {
            
            navigate("/")
        }else if(!authStatus && authStatus !== authentication){

        }
        setLoader(false)

    }, [authStatus , navigate , authentication])
  return loader? <h1>loading...</h1>: <>{children}</>
}

export default AuthLayout