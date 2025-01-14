import { useState } from "react";
import avatar from "../assets/avtar.svg";
import response from "../assets/output3.svg";
import { IoSend } from "react-icons/io5";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import './Components.css'
import Header from "./Header";
import { useAuthStore } from "../Store/useAuthStore.js";
import { axiosInstance } from "../lib/axios.js"; // Ensure axiosInstance is set up for API calls

const MainChatArea = ({ isSidebarMinimized }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { authUser } = useAuthStore();

  const handleSend = async () => {
    if (!input.trim()) return; // Prevent sending empty messages

    const newUserMessage = { type: "user", text: input.trim() };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Send user message to backend
      const res = await axiosInstance.post("/ai/response", {
        userId: authUser._id,
        message: input.trim(),
      });

      const botResponse = res.data.reply;

      const newBotMessage = { type: "bot", text: botResponse };
      setMessages((prevMessages) => [...prevMessages, newBotMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        type: "bot",
        text: "Sorry, I encountered an issue. Please try again.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        setInput((prev) => prev + "\n");
      } else {
        e.preventDefault();
        handleSend();
      }
    }
  };

  return (
    <div
      className={`${
        isSidebarMinimized ? "flex-[0.95]" : "flex-[0.8]"
      } transition-all duration-500 flex flex-col justify-between items-center pb-7`}
    >
      <Header userName={authUser?.fullName} />
      <div className="chats w-[90%] h-[90%] border-b border-b-gray-400 p-4 flex flex-col justify-between rounded-[20px]">
        <div className="response h-full flex flex-col gap-4 mt-4 justify-start items-start">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`individualResponses flex  gap-2 p-3 rounded-2xl max-w-[70%] ${
                msg.type === "bot"
                  ? " border-b border-blue-300 self-start "
                  : "bg-[#222322] border-t border-blue-300 self-end text-[#cdcaca] items-center"
              }`}
            >
              {msg.type === "bot" && (
                <img
                  src={response}
                  alt="bot avatar"
                  className="w-8 h-8 rounded-lg"
                />
              )}
              {msg.type === "bot" ? (
                <SyntaxHighlighter
                  language="javascript"
                  style={oneDark}
                  className="rounded-lg p-2 syntax-highlighter"
                  customStyle={{
                    maxWidth: "800px",
                    wordWrap: "break-word", // Ensures words break if necessary
                    whiteSpace: "pre-wrap", // Preserves spaces and breaks lines appropriately

                    padding: "10px",
                    borderRadius: "10px",
                    fontSize: "15px",
                  }}
                >
                  {msg.text}
                </SyntaxHighlighter>
              ) : (
                <span>{msg.text}</span>
              )}
              {msg.type === "user" && (
                <img
                  src={avatar}
                  alt="user avatar"
                  className="w-8 h-8 rounded-lg"
                />
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 p-4 text-green-500 self-start">
              <div className="loader"></div>
              <span>Getting Response...</span>
            </div>
          )}
        </div>

        <div className="inputs flex items-center mt-4 bg-gray-800 border-b text-[20px] rounded-lg px-4 py-2 ">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your question here"
            className="flex-1 outline-none bg-transparent resize-none text-white"
            rows={1}
          />
          <button onClick={handleSend}>
            <IoSend className="text-[#16C47F]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainChatArea;
