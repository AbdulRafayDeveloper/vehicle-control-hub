import React from "react";
import UserProfileCard from "../../components/SideBar/SideBar";
import Header from "../../components/Header/Header";

const Notifications = () => {
  return (
    <div>
      <Header
        title="My Notifications"
        navText="User / My Notifications"
      ></Header>
      <UserProfileCard />
    </div>
  );
};

export default Notifications;
