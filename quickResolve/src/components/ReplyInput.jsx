import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReply } from "../store/replySlice";
import replyServices from "../appwrite/replyServices";

function ReplyInput({ ticketId }) {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.userData);
  const role = useSelector((state) => state.auth.role);

  const handleSend = async () => {
    if (!message.trim()) return;

    const info = {
      ticketId: ticketId,
      message: message.trim(),
      sendersId: user.$id,
      sendersRole: role,
    };

    const sendmsg = await replyServices.createReplies(info);

    if (sendmsg) {
      dispatch(createReply(info));
      setMessage("");
    }
  };

  return (
    <div className="bg-white p-4 border-t border-gray-200 rounded-b-lg flex gap-3 items-center">
      <textarea
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        placeholder="Write a reply..."
        rows={2}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={handleSend}
        disabled={!message.trim()}
        className={`bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed`}
      >
        Send
      </button>
    </div>
  );
}

export default ReplyInput;
