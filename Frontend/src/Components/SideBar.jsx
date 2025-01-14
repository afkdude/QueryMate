/* eslint-disable react/prop-types */
import { FiLogOut, FiPlus } from "react-icons/fi";
import logo from "../assets/query.png";
import queryLogo from "../assets/queryLogo.png";

import { CiChat1 } from "react-icons/ci";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { useAuthStore } from "../Store/useAuthStore.js";

const SideBar = ({ isSidebarMinimized, toggleSidebar }) => {
  const { logout } = useAuthStore(); // Access the logout function from the store

  const handleLogout = () => {
    logout(); // Call the logout function
  };

  return (
    <div
      className={`${
        isSidebarMinimized ? "flex-[0.05]" : "flex-[0.2]"
      } transition-all duration-300 flex flex-col border-r-[2px] `}
    >
      {/* Top Section with Toggle Button */}
      <div className="px-4 py-2 flex items-center justify-between border-b-[2px]">
        <img
          src={logo}
          alt="Genie Logo"
          className={` flex-1 ${
            isSidebarMinimized ? " hidden w-[30px]" : "w-[60px]"
          } transition-all duration-300`}
        />
        {isSidebarMinimized && (
          <img src={queryLogo} alt="" />
        )}
        <button className="text-2xl cursor-pointer text-white" onClick={toggleSidebar}>
          {isSidebarMinimized ? <IoMdArrowDropright /> : <IoMdArrowDropleft />}
        </button>
      </div>

      {/* Main Content */}
      {!isSidebarMinimized ? (
        <div className="flex flex-col h-full border-b-[2px] text-gray-800">
          <div className="upperSide flex flex-col p-4 gap-4 flex-[0.8]">
            <div className="new-chat-btn flex items-center justify-center bg-[#19A7CE] text-white font-semibold text-xl rounded-md py-2 gap-1 cursor-pointer ">
              <FiPlus className="text-[25px]" />
              <button className="btn-hover color-1">New Chat</button>
            </div>
            <div className="chat-lists flex flex-col gap-2">
              <div className="query-btn flex items-center justify-start ps-2 bg-[#dbedf6] rounded-md py-2 gap-2">
                <CiChat1 className="text-[20px] text-[#146C94]" />
                <button>Write an article on democracy</button>
              </div>
              <div className="query-btn flex items-center justify-start ps-2 bg-[#dbedf6] rounded-md py-2 gap-2">
                <CiChat1 className="text-[20px] text-[#146C94]" />
                <button>What is 22+22?</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full border-b-[2px]">
          <div className="upperSide flex flex-col p-4 gap-4 flex-[0.8]">
            <div className="new-chat-btn flex items-center justify-center bg-[#19A7CE] text-white font-semibold text-xl rounded-md py-2 gap-1 cursor-pointer gradient-background">
              <FiPlus className="text-[25px]" />
            </div>
          </div>
        </div>
      )}

      {/* Lower Section */}
      <div
        className={`lowerSide flex flex-col gap-2 p-4 te text-black ${
          isSidebarMinimized ? "items-center " : "justify-center"
        }`}
      >
        <ul className="flex flex-col gap-4 text-white">
          <li
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleLogout}
          >
            <FiLogOut className="text-[25px]" />
            {!isSidebarMinimized && <span>Logout</span>}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
