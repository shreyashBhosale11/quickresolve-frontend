import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import replyService from "../appwrite/replyServices";
import { createReply, clearReplies } from "../store/replySlice";

function ReplyList({ ticketId }) {
  const dispatch = useDispatch();
  const replies = useSelector((state) => state.reply.replies);
  const currentUserId = useSelector((state) => state.auth.userData?.$id);

  useEffect(() => {
    async function fetchReply() {
      try {
        const res = await replyService.getRepliesByTicketId(ticketId);
        if (res) {
          dispatch(createReply(res.documents));
        }
      } catch (error) {
        console.error("Error fetching replies", error);
      }
    }
    fetchReply();
    return () => {
      dispatch(clearReplies());
    };
  }, [ticketId, dispatch]);

  if (!replies || replies.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        No replies yet. Be the first to reply!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 max-h-96 overflow-y-auto px-2 py-2">
      {replies.map((reply) => {
        const isMine = reply.sendersId === currentUserId;
        return (
          <div
            key={reply.$id}
            className={`flex ${isMine ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-lg text-sm break-words
                ${isMine ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}
              `}
            >
              <p>{reply.message}</p>
              <div className="text-xs opacity-70 mt-1 flex justify-between">
                <span>{reply.sendersRole}</span>
                {/* Optional timestamp if available */}
                {reply.$createdAt && (
                  <span>{new Date(reply.$createdAt).toLocaleTimeString()}</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ReplyList;
