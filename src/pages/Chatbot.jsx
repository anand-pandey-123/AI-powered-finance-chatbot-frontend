import {
  Send,
  LogOut,
  Bot,
  User,
  ArrowBigRightDashIcon,
  AlertTriangleIcon,
} from "lucide-react";
import { useRef } from "react";
import { useState } from "react";
// import { fetchAIResponse } from "../api/fetchAIResponse";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchAIResponse } from "../api/fetchAIResponse";
// import { fetchAIResponse } from "../api/fetchAIResponse";

export const Chatbot = () => {
  const navigate = useNavigate();
  const authToken = useAuth();

  const [messages, setMessages] = useState([
    {
      role: "model",
      text: {
        response: {
          message: "Hello! How can I help you today?",
        },
      },
    },
  ]);
  const messageContainerRef = useRef(null);

  const inputRef = useRef(null);

  useEffect(() => {
    messageContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!authToken || authToken === "null" || authToken === "undefined") {
    return <Navigate to={"/login"} />;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const msg = inputRef.current.value;
    console.log(msg);

    setMessages((prev) => [
      ...prev,
      { role: "user", text: { response: { message: msg } } },
    ]);
    inputRef.current.value = "";

    const response = await fetchAIResponse({ userId: "1", message: msg });
    console.log(response);

    setMessages((prev) => [...prev, { role: "model", text: response }]);
    console.log(response);
  }

  function handleLogOut() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  console.log(messages);

  return (
    <div className="min-h-screen  bg-gray-900 text-white flex flex-col">
      <header className="bg-gray-800 shadow-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AI Chatbot</h1>
              {/* <p className="text-sm text-gray-600">{user?.email}</p> */}
            </div>
          </div>
          <button
            onClick={handleLogOut}
            className="flex items-center gap-2 px-4 py-2 text-white hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-auto flex flex-col max-w-5xl w-full mx-auto">
        <div
          //   className="flex-1 overflow-y-auto px-4 py-6 space-y-4"
          className="flex-2 overflow-y-auto p-5 py-2 space-y-4 mb-8"
        >
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 ${
                message.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  message.role === "user" ? "bg-gray-700" : "bg-blue-600"
                }`}
              >
                {message.role === "user" ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-white" />
                )}
              </div>
              <div
                className={`flex-1 max-w-2xl ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block px-4 py-3 rounded-2xl ${
                    message.role === "user"
                      ? "bg-gray-700 text-white"
                      : " bg-gray-800 text-white shadow-sm"
                  }`}
                >
                  {message.text?.response?.guidance &&
                  message.text?.response?.guidance?.length > 0 ? (
                    <div className="p-2">
                      <h2 className="text-2xl flex gap-2 items-center font-bold mb-6">
                        <ArrowBigRightDashIcon />
                        My guidance for you
                      </h2>
                      <ol className="" type="1">
                        {message.text?.response?.guidance?.map(
                          (guidance, i) => {
                            return (
                              <li key={i} type="1" className="mb-4 p-2">
                                <h3 className="font-bold text-lg">
                                  {guidance?.title}
                                </h3>
                                <p>{guidance?.description}</p>
                              </li>
                            );
                          }
                        )}
                      </ol>
                    </div>
                  ) : (
                    <p className="text-md leading-relaxed mb-4">
                      {message.text?.response?.message ??
                        message.text?.response?.summary}
                    </p>
                  )}
                  {message.text?.response?.disclaimer && (
                    <div>
                      <h3 className="text-xl flex items-center gap-2 font-bold mb-2">
                        <AlertTriangleIcon />
                        Disclaimer
                      </h3>
                      <p className="italic font-semibold underline">
                        {message.text?.response?.disclaimer}
                      </p>
                    </div>
                  )}
                </div>
                {/* <p className="text-xs text-gray-500 mt-1 px-2">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p> */}
              </div>
            </div>
          ))}

          {/* {isTyping && (
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white px-4 py-3 rounded-2xl shadow-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )} */}

          {/* <div ref={messagesEndRef} /> */}
          <div ref={messageContainerRef} className="flex-1" />
        </div>

        <div className="  p-4">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="flex gap-3">
              <input
                type="text"
                // value={inputValue}
                ref={inputRef}
                // onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
              <button
                type="submit"
                // disabled={!inputValue.trim() || isTyping}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
