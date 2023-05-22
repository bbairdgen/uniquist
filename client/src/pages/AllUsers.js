import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ALL_USERS } from "../utils/queries";
import React, { useState } from "react";

const AllUsers = () => {
  const { loading, data } = useQuery(QUERY_ALL_USERS);
  const userList = data?.users || [];
  console.log(userList);
  for (let i = 0; i > userList.length; i++) {
    const user = userList[i];
    console.log(user);
  }

  return (
    <section className="user-info">
      <h2>check out all these guys</h2>
      {userList.map((user, i) => {
        return (
          <div className="user-card" key={user._id}>
            <h3>{user.username}</h3>
          </div>
        );
      })}
    </section>
  );
};

export default AllUsers;
