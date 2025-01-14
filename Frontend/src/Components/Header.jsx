/* eslint-disable react/prop-types */



const Header = ({ userName }) => {
  return (
    <div className="text-white flex justify-center items-center w-full py-4 px-4 text-xl ">
      {/* Display user's name */}
      <div className="user-name font-semibold text-[35px] italic text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-text">
        Welcome {userName}👑
      </div>
      {/* <div className="h-11 w-11 rounded-lg flex items-center justify-center bg-white ">
        <img src={avatar} alt="User Avatar" className="h-full w-full" />
      </div> */}
    </div>
  );
};

export default Header;
