import React, { useState, useEffect } from "react";
import "../styles/Contacts.css";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );

      if (data) {
        setCurrentUserName(data.username);
        if (data.avatarImage) {
          const imageUrl = data.avatarImage.startsWith("data:image")
            ? data.avatarImage
            : `data:image/svg+xml;base64,${data.avatarImage}`;
          setCurrentUserImage(imageUrl);
        }
      }
    };
    fetchUserData();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <div className="contacts-container">
          <div className="brand">
            <h3>Contacts</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              const avatarImage = contact.avatarImage.startsWith("data:image")
                ? contact.avatarImage
                : `data:image/svg+xml;base64,${contact.avatarImage}`;

              return (
                <div
                  key={contact._id}
                  className={`contact ${index === currentSelected ? "selected" : ""}`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={avatarImage}
                      alt="Contact avatar"
                      onError={(e) => e.target.src = "/path/to/placeholder/image.png"} // Set a placeholder image path
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={currentUserImage}
                alt="Current user avatar"
                onError={(e) => e.target.src = "/path/to/placeholder/image.png"}
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
