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
  <div  className="py-10 px-4 bg-neutral-50 min-h-screen">
    <form onSubmit={handleSubmit(Add)}>
      {/* Card */}
      <div className="mx-auto max-w-5xl bg-white border border-neutral-200 rounded-xl shadow-sm p-6">

        {/* Header */}
        <div className="mb-6 border-b border-neutral-200 pb-4">
          <h2 className="text-xl font-semibold text-neutral-800">
            Create Ticket
          </h2>
          <p className="text-sm text-neutral-500">
            Provide details so our team can help you faster.
          </p>
        </div>

        {/* Form Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-4">
            <InputBox
              label="Title"
              placeholder="Short summary of the issue"
              {...register("title", { required: true })}
            />

            <InputBox
              label="Description"
              placeholder="Explain your problem in detail"
              className="min-h-[140px]"
              {...register("description", { required: true })}
            />
          </div>

          {/* Right Section */}
          <div className="space-y-4">
            <InputBox
              label="Upload Image"
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("ticketAttachments")}
            />

            <Select
              label="Priority"
              options={["low", "normal", "high"]}
              {...register("priority", { required: true })}
            />
             


            <Button
              type="submit"
              text="Submit Ticket"
              className="w-full "
            />
          </div>
        </div>
      </div>
    </form>
  </div>
);

}

export default TicketForm
