import React, { useState , useEffect ,useId} from 'react'
import { useForm } from "react-hook-form"
import { Button, InputBox, Select } from './index'
import ticketSerive from '../appwrite/config';
import { useSelector, useDispatch } from 'react-redux'
import authService from '../appwrite/auth';
import { createTicket } from '../store/ticketSlice';



function TicketForm() {
  const id = useId();
  const { register, handleSubmit } = useForm();


 
  const userId = useSelector((state) => state.auth.userData?.$id)
 useEffect(() => {
      console.log("User ID:", userId)
    }, [userId])

   
  const dispatch = useDispatch();

  

  const Add = async(data)=>{
    try {
    const file = data.ticketAttachments?.[0];
    let fileId = null;

    const uploadedFile = await ticketSerive.uploadFile(file);
    
     if (!uploadedFile || !uploadedFile.$id) {
          console.log("File upload failed, continuing without attachment");
        } else {
          fileId = uploadedFile.$id;
        }
    
    

    const ticketPayload = {
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: "open",        // system controlled
        attachmentid: fileId ? String(fileId) : null,   // null if upload failed
        agentId: null,
        userId: userId,

        
        
    }

    

    
      const dbTicket = await ticketSerive.createTicket(ticketPayload);
      if (dbTicket) {
        dispatch(createTicket(dbTicket))
      }


      
    } catch (error) {
      console.error("Ticket creation error:", error);
    }

    
    
  }

  return (
    <div className='py-8'>
      <form onSubmit={handleSubmit(Add)}>
        <div className='flex'>
          <div className='w-2/3 px-4'>
            <InputBox 
              label="Title:"
              placeholder="Title"
              className='mb-4'
              {...register("title", { required: true })}
            />

            <InputBox 
              label="Description:"
              placeholder="Description"
              className='pb-20'
              {...register("description", { required: true })}
            />
          </div>

          <div className='w-1/3 px-4'>
            <InputBox 
              label="Upload Image:"
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              className='mb-4'
              {...register("ticketAttachments")}
            />

            <Select 
              options={["low", "normal", "high"]}
              label="Priority"
              className="mb-4"
              {...register("priority", { required: true })}
            />

            <Button type='submit' text='Submit' />
          </div>
        </div>
      </form>
    </div>
  )
}

export default TicketForm
