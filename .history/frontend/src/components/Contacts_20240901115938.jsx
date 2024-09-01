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
    let isMounted = true; // Flag to check if component is mounted

    async function fetchUserData() {
      try {
        const data = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
        if (isMounted) { // Check if component is still mounted
          setCurrentUserName(data?.username);
          setCurrentUserImage(data?.avatarImage);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }

    fetchUserData();

    return () => {
      isMounted = false; // Cleanup function to set flag false when component unmounts
    };
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
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`} // Ensure contact.avatarImage is correctly formatted
                    alt={contact.username}
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
                src={`data:image/svg+xml;base64,${currentUserImage}`} // Ensure currentUserImage is correctly formatted
                alt="current user avatar"
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
