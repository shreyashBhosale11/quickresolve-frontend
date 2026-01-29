import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ticketSerive from '../appwrite/config'

function Home() {

  const authStatus = useSelector((state)=>state.auth.status)
  const [ticket , setTicket ] = useState([]);
 
 if (!authStatus ) {
  return(
    <div>log in </div>
  )
 }else{
  return(
    <div>you are login</div>
  )
 }
}

export default Home