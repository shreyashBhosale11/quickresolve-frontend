import React, { useState  ,useEffect} from 'react'
import {useForm} from "react-hook-form"
import {Button, InputBox }from '../index';
import { login } from '../../store/authSlice';
import {useDispatch} from "react-redux"
import authService from "../../appwrite/auth"
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';


function SigninForm() {
  const {register ,  handleSubmit} = useForm();
  const [error , setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  

  const create  = async(data)=>{
     setError("")
     console.log(data);
    try {
        const userData = await authService.createAccount(data);
       console.log("Account created successfully")
        if(userData){
                    await authService.setRole("user");
                    console.log("assiend user roal")
                    const currentUserData  = await authService.getCurrentUser()
                    if(currentUserData) dispatch(login(currentUserData));
                    console.log("Account created & user stored in Redux");
                    navigate("/")
                }
      
      
    } catch (error) {
       setError(error.message || "Signup failed")
    }
    

  }

    //   const authData = useSelector(state => state.auth.userData);

    // useEffect(() => {
    //   console.log("User logged in:", authData);
    // }, [authData]);



  return (
    <div
    className='flex items-center justify-center w-full'
    >
       < div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
             <div className="mb-2 flex justify-center">
                 

             <form onSubmit={handleSubmit(create)}
                    className='mt-8'>
            <div className='space-y-5'>
                <InputBox
                          label="Full Name: "
                          placeholder="Enter your full name"
                          {...register("name", {
                              required: true,
                          })}
                          />
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
  )
}

export default SigninForm