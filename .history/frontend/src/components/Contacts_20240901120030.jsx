// // import React, { useState, useEffect } from "react";
// // import "../styles/Contacts.css";

// // export default function Contacts({ contacts, changeChat }) {
// //   const [currentUserName, setCurrentUserName] = useState(undefined);
// //   const [currentUserImage, setCurrentUserImage] = useState(undefined);
// //   const [currentSelected, setCurrentSelected] = useState(undefined);

// //   useEffect(async () => {
// //     const data = await JSON.parse(
// //       localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
// //     );
// //     setCurrentUserName(data.username);
// //     setCurrentUserImage(data.avatarImage);
// //   }, []);

// //   const changeCurrentChat = (index, contact) => {
// //     setCurrentSelected(index);
// //     changeChat(contact);
// //   };

// //   return (
// //     <>
// //       {currentUserImage && currentUserName && (
// //         <div className="contacts-container">
// //           <div className="brand">
// //             <h3>Contacts</h3>
// //           </div>
// //           <div className="contacts">
// //             {contacts.map((contact, index) => (
// //               <div
// //                 key={contact._id}
// //                 className={`contact ${index === currentSelected ? "selected" : ""}`}
// //                 onClick={() => changeCurrentChat(index, contact)}
// //               >
// //                 <div className="avatar">
// //                   <img
// //                     src={`data:image/svg+xml;base64,${contact.avatarImage}`}
// //                     alt=""
// //                   />
// //                 </div>
// //                 <div className="username">
// //                   <h3>{contact.username}</h3>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //           <div className="current-user">
// //             <div className="avatar">
// //               <img
// //                 src={`data:image/svg+xml;base64,${currentUserImage}`}
// //                 alt="avatar"
// //               />
// //             </div>
// //             <div className="username">
// //               <h2>{currentUserName}</h2>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // }


// import React, { useState, useEffect } from "react";
// import "../styles/Contacts.css";

// export default function Contacts({ contacts, changeChat }) {
//   const [currentUserName, setCurrentUserName] = useState(undefined);
//   const [currentUserImage, setCurrentUserImage] = useState(undefined);
//   const [currentSelected, setCurrentSelected] = useState(undefined);

//   useEffect(() => {
//     async function fetchUserData() {
//       const data = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
//       setCurrentUserName(data.username);
//       setCurrentUserImage(data.avatarImage);
//     }

//     fetchUserData();
//   }, []);

//   const changeCurrentChat = (index, contact) => {
//     setCurrentSelected(index);
//     changeChat(contact);
//   };

//   return (
//     <>
//       {currentUserImage && currentUserName && (
//         <div className="contacts-container">
//           <div className="brand">
//             <h3>Contacts</h3>
//           </div>
//           <div className="contacts">
//             {contacts.map((contact, index) => (
//               <div
//                 key={contact._id}
//                 className={`contact ${index === currentSelected ? "selected" : ""}`}
//                 onClick={() => changeCurrentChat(index, contact)}
//               >
//                 <div className="avatar">
//                   <img
//                     src={`data:image/svg+xml;base64,${contact.avatarImage}`}
//                     alt=""
//                   />
//                 </div>
//                 <div className="username">
//                   <h3>{contact.username}</h3>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="current-user">
//             <div className="avatar">
//               <img
//                 src={`data:image/svg+xml;base64,${currentUserImage}`}
//                 alt="avatar"
//               />
//             </div>
//             <div className="username">
//               <h2>{currentUserName}</h2>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



import React, { useState, useEffect } from "react";
import "../styles/Contacts.css";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const data = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
        if (data) {
          setCurrentUserName(data.username);
          setCurrentUserImage(data.avatarImage);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }

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
            {contacts.map((contact, index) => (
              <div
                key={contact._id}
                className={`contact ${index === currentSelected ? "selected" : ""}`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`} // Verify if the image format is correct
                    alt=""
                  />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`} // Verify if the image format is correct
                alt="avatar"
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
