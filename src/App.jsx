import { Route, Routes } from "react-router-dom";
import "./index.css";
import { Chatbot } from "./pages/Chatbot";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toast";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Chatbot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
