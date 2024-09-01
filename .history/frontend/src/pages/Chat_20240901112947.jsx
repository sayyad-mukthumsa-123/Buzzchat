// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";
// import { allUsersRoute, host } from "../utils/APIRoutes";
// import ChatContainer from "../components/ChatContainer";
// import Contacts from "../components/Contacts";
// import Welcome from "../components/Welcome";
// import "../styles/Chat.css";

// export default function Chat() {
//   const navigate = useNavigate();
//   const socket = useRef();
//   const [contacts, setContacts] = useState([]);
//   const [currentChat, setCurrentChat] = useState(undefined);
//   const [currentUser, setCurrentUser] = useState(undefined);

//   useEffect(async () => {
//     if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
//       navigate("/login");
//     } else {
//       setCurrentUser(
//         await JSON.parse(
//           localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
//         )
//       );
//     }
//   }, []);

//   useEffect(() => {
//     if (currentUser) {
//       socket.current = io(host);
//       socket.current.emit("add-user", currentUser._id);
//     }
//   }, [currentUser]);

//   useEffect(async () => {
//     if (currentUser) {
//       if (currentUser.isAvatarImageSet) {
//         const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
//         setContacts(data.data);
//       } else {
//         navigate("/setAvatar");
//       }
//     }
//   }, [currentUser]);

//   const handleChatChange = (chat) => {
//     setCurrentChat(chat);
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-inner-container">
//         <Contacts contacts={contacts} changeChat={handleChatChange} />
//         {currentChat === undefined ? (
//           <Welcome />
//         ) : (
//           <ChatContainer currentChat={currentChat} socket={socket} />
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import "../styles/Chat.css"; // Ensure the path is correct

export default function Chat({ selectedContact }) {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    async function fetchMessages() {
      if (selectedContact) {
        try {
          const response = await fetch(`/api/messages/${selectedContact.id}`);
          const data = await response.json();
          setMessages(data.messages);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    }

    fetchMessages();
  }, [selectedContact]); // Dependency on selectedContact ensures the effect runs when it changes

  const handleSendMessage = async () => {
    if (messageText.trim()) {
      try {
        const response = await fetch("/api/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contactId: selectedContact.id,
            text: messageText,
          }),
        });

        if (response.ok) {
          const newMessage = await response.json();
          setMessages([...messages, newMessage]);
          setMessageText("");
        } else {
          console.error("Error sending message:", response.statusText);
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>{selectedContact?.name}</h2>
      </div>
      <div className="chat-body">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.fromMe ? "sent" : "received"}`}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}
