import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ALL_USERS } from "../utils/queries";
import React, { useState } from "react";
import BandNamesInfo from "../components/BandNamesInfo";
import Auth from "../utils/auth";
import "../css/allUsers.css";

const BandNames = () => {
  const { loading, data } = useQuery(QUERY_ALL_USERS);
  const userList = data?.users || [];
//   console.log("user list");
//   console.log(userList);

  for (let i = 0; i > userList.length; i++) {
    const user = userList[i];
    
  }

  console.log('Hello guys');
  return (
    <section className="user-info">
      <h2>check out all these guys</h2>
      {userList.map((user, i) => {
        // console.log(user);
        // console.log(user.username);
        // if (user.favorites[0].text) {
        //   console.log(user.favorites[0].text);
        // }

        return (
          <BandNamesInfo
            key={user._id}
            id={user._id}
            name={user.username}
            bandNames={user.favorites}
          ></BandNamesInfo>
        );
      })}
    </section>
  );
};

export default BandNames;

// return (
//     <>
//         <h2>Band Names Favorites</h2>
//         <div className="container-fluid bandnames">
//             <div className="row">  
//                 <div className="image-container d-flex justify-content-start m-3">
//                     <h3>Band Names</h3>
//                     <p><button>Delete Band Name</button></p>
//                 </div>
//                 <div className="image-container d-flex justify-content-start m-3">
//                     <h3>Band Names 1</h3>
//                     <p><button>Delete Band Name</button></p>
//                 </div>
//                 <div className="image-container d-flex justify-content-start m-3">
//                     <h3>Band Names 3</h3>
//                     <p><button>Delete Band Name</button></p>
//                 </div>
//             </div>
//         </div>
//     </>
    
//   );