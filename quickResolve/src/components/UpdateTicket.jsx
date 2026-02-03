import React from "react";
import { useForm } from "react-hook-form";
import { Select, InputBox, Button } from "./index";
import { useSelector } from "react-redux";
import ticketService from "../appwrite/config";

function UpdateTicket({ ticket }) {
  const role = useSelector((state) => state.auth.role); 
  console.log("is id present", ticket.id)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      status: ticket.status,
      priority: ticket.priority,
      agentId: ticket.agentId || "",
    },
  });

  const onSubmit = async (data) => {
    const updateData = {  };

    if (role === "agent") {
      updateData.status = data.status;
    }

    if (role === "admin") {
      updateData.status = data.status;
      updateData.priority = data.priority;
      updateData.agentId = data.agentId;
    }

    try {
       await ticketService.updateTicket(ticket.id, updateData);;
      alert("Ticket updated successfully");
    } catch (error) {
      console.error("Ticket update failed", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-md rounded-lg p-6 space-y-6"
    >
      <h2 className="text-xl font-semibold text-gray-800">Update Ticket</h2>

      {/* Status (Agent + Admin) */}
      <div>
        <Select
          label="Status"
          options={["open", "in progress", "resolved", "closed"]}
          {...register("status")}
        />
      </div>

      {/* Admin only fields */}
      {role === "admin" && (
        <>
          <div>
            <Select
              label="Priority"
              options={["low", "medium", "high"]}
              {...register("priority")}
            />
          </div>

          <div>
            <InputBox
              label="Assign Agent ID"
              placeholder="Enter agent user ID"
              {...register("agentId")}
            />
          </div>
        </>
      )}

      {/* Submit Button */}
      <div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="!bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          text={isSubmitting ? "Updating..." : "Update Ticket"}
        />
      </div>
    </form>
  );
}

export default UpdateTicket;
