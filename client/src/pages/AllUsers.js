import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ALL_USERS } from "../utils/queries";
import React, { useState } from "react";
import UserInfo from "../components/UserInfo";
import "../css/allUsers.css";

const AllUsers = () => {
  const { loading, data } = useQuery(QUERY_ALL_USERS);
  const userList = data?.users || [];
  if (!loading) {
    console.log("user list", userList);
  }

  for (let i = 0; i > userList.length; i++) {
    const user = userList[i];
  }

  return (
    <>
      <h2>OUR UNIQISTS</h2>
      <section className="user-info">
        {userList.map((user) => {
          // console.log(user);
          // console.log(user.username);
          // if (user.favorites[0].text) {
          //   console.log(user.favorites[0].text);
          // }
          return (
            <UserInfo
              key={user._id}
              id={user._id}
              name={user.username}
              bandNames={user.favorites}
            ></UserInfo>
          );
        })}
      </section>
    </>
  );
};

export default AllUsers;
