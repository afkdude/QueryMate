import MainChatArea from "../Components/MainChatArea"
import SideBar from "../Components/SideBar"
import { useState } from "react";

import './Pages.css'

const HomePage = () => {


    const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

    // Function to toggle the sidebar state
    const toggleSidebar = () => {
      setIsSidebarMinimized((prev) => !prev);
    };
  return (
    <div className=" flex main-screen   w-screen  h-screen  ">
      <SideBar
        isSidebarMinimized={isSidebarMinimized}
        toggleSidebar={toggleSidebar}
      />
      <MainChatArea isSidebarMinimized={isSidebarMinimized}  />
    </div>
  );
}

export default HomePage