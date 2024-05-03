import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReply } from '@/components/features/tickets/TicketDiscussionSlice';
import { RootState } from '@/app/store';
import { FetchTicketReplies, AddTicketReply } from '@/components/features/tickets/TicketDiscussionSlice';

const ChatApp = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.ticketReplies.replies);

  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    dispatch(FetchTicketReplies(4)); // Fetch replies when component mounts or id changes
  }, [ dispatch]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/socket-server/');
    setSocket(ws);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      dispatch(addReply(message));
    };

    return () => {
      ws.close();
    };
  }, [dispatch]);

  const handleSendMessage = () => {
    if (input && socket) {
      const message = { text: input, timestamp: Date.now() };
      socket.send(JSON.stringify(message));
      setInput('');
    }
  };

  return (
    <div className="p-4">
      <div className="chat-box h-64 overflow-y-scroll border text-black">
        {messages.map((msg, idx) => (
          <div key={idx} className="p-2 border-b">
            {msg.content}
          </div>
        ))}
      </div>

      <div className="mt-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow border p-2"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-500 text-black p-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
