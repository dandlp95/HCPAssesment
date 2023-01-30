import React from "react";
import userContainer from "./userContainer.module.css";

const UserContainer = (props) => {
  return (
    <div className={userContainer.userContainer}>
      <div className={userContainer.Container}>
        <div>First Name: {props.user.first_name}</div>
        <div>Last Name: {props.user.last_name}</div>
        <div>Company Name: {props.user.company_name}</div>
        <div>Company Full Address: {props.user.company_full_address}</div>
        <div>Website: {props.user.website}</div>
        <div>Phone: {props.user.phone}</div>
      </div>
    </div>
  );
};

export default UserContainer;
