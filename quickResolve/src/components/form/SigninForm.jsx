import React, { useState  ,useEffect} from 'react'
import {useForm} from "react-hook-form"
import {Button, InputBox }from '../index';
import { login } from '../../store/authSlice';
import {useDispatch} from "react-redux"
import authService from "../../appwrite/auth"
import { useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';


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
                  if(currentUserData) {
                    console.log(currentUserData)
                    dispatch(login(currentUserData));
                    console.log("Account created & user stored in Redux");
                    navigate("/")
                  }
                   
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
  <div className="flex items-center justify-center w-full min-h-screen bg-gray-50 dark:bg-gray-900">
    <div className=" mx-auto w-full
      max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl
      bg-white dark:bg-gray-800
      rounded-xl
      p-10 lg:p-14 xl:p-16
      border border-gray-200 dark:border-gray-700
      shadow-md ">

      
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Create Account
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-300 text-sm">
          Sign up to start managing tickets
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(create)} className="mt-6 space-y-5">
        <InputBox
          label="Full Name"
          placeholder="Enter your full name"
          {...register("name", { required: true })}
        />

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
          text="Sign Up"
        />
      </form>

      {/* Login Link */}
      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
        Already have an account?{" "}
        <Link to={"/login"} className="text-blue-600 hover:underline" >
          Log in
        </Link>
      </p>
    </div>
  </div>
)

  
}

export default SigninForm



