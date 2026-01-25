import React, { useState } from 'react'
import InputBox from '../InputBox'
import {useForm} from "react-hook-form"
import { login as authLogin } from '../../store/authSlice';
import Button from '../Button';
import {useDispatch} from "react-redux"
import authService from '../../appwrite/auth'
import { useNavigate } from 'react-router-dom';

function LogInForm() {

    const {register , handleSubmit} = useForm();
    const [error , setError] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    

    const login = async (data) =>{
        setError("")
        try {
          const session =  await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                console.log("useris fetched")
                navigate('/')
                
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <>
     <div
    className='flex items-center justify-center w-full'
    >
       < div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
             <div className="mb-2 flex justify-center">
                 

             <form onSubmit={handleSubmit(login)}
                    className='mt-8'>
            <div className='space-y-5'>
               <InputBox
               label = "Email"
               placeholder = "Enter your email"
               type = "email"
                {...register("email" , {
                    required:true,
                    // validate: {
                    //     matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    //     "Email address must be a valid address",
                    // }
                })}
               
               />

               <InputBox
               label="password"
               type= "password"
               placeholder = "Enter your password"
               {...register("password" ,{
                required: true
               })}
               />
               <Button 
               type= "submit"
               className= "w-full"
               text={"Sign in"}>
                Sign in </Button>
            </div>


        </form>

             </div>
       </div>
    </div>

    
    </>
  )
}

export default LogInForm