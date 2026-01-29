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
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-50 dark:bg-gray-900 ">
      <div className=" mx-auto w-full
      max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl
      bg-white dark:bg-gray-800
      rounded-xl
      p-10 lg:p-14 xl:p-16
      border border-gray-200 dark:border-gray-700
      shadow-md ">

        {/* Title */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Welcome Back
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Sign in to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(login)} className="mt-6 space-y-5">
          <InputBox
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />

          <InputBox
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />

          <Button
            type="submit"
            className="w-full !bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors"
            text="Sign in"
          />
        </form>

        {/* Signup link */}
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  </>
)

}

export default LogInForm