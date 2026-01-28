import React from 'react'
import {useForm} from "react-hook-form"
import {Button, InputBox ,Select} from './index'
import ticketSerive from '../appwrite/config';
import { useSelector } from 'react-redux';


function TicketForm() {
  const {register, handleSubmit}= useForm();
  const userData = useSelector((state)=> state.auth.userData)

  const Addticket =async (data)=>{
    if (condition) {
      
    }else{
      const file = await ticketSerive.uploadFile(data.ticket-attachments[0]);
      if(file){
        const fileId = file.$id;
        data.attachmentid = fileId
        const dbTicket = await ticketSerive.createTicket({...data , userId:userData.$id})

        if (dbTicket) {
          
        }
       }
    }

  }
  return (
    <div className='py-8'>
    
      <form onSubmit={Addticket}>
        <div className='flex '>
          <div className='w-2/3 px-4  '>
            <InputBox 
              label = "Title :"
              placeholder = "Title"
              className = 'mb-4'
              {...register("title",{required:true})}

             />

             <InputBox 
              label = "description :"
              placeholder = "description"
              className = 'pb-20'
              {...register("description",{required:true})}

             />
             

            </div>
            <div className='w-1/3 px-4'>
            <InputBox 
              label = "upload image :"
              type = "file"
              accept = "image/png, image/jpg, image/jpeg, image/gif"
              className = 'mb-4'
              {...register("ticket-attachments",{required:true})} />

              <Select 
                options={["open" , "processed ", "close"]} 
                label="Status"
                className="mb-4"
                {...register("status", {required:true} )}/>

                <Select 
                options={["noemal" , "high ", "low"]} 
                label="Status"
                className="mb-4"
                {...register("status", {required:true} )}/>

                <Button type='submit' text='submit'/>
          
            </div>

            
            
          </div>

        </form>
    </div>
  )
}

export default TicketForm