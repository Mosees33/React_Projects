import Home from "./Pages/Home/Home";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Player from "./Pages/Player/Playes";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Auth } from "./firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    onAuthStateChanged(Auth, async (user) => {
      if (user) {
        console.log("Logged In");
        if(location.pathname === '/login'){
            navigate("/");
        }
      } else {
        console.log("Logged Out");
        if (
          location.pathname === "/" ||
          location.pathname.startsWith("/player")
        ) {
          navigate("/login");
        }
      }
    });
  }, [navigate, location.pathname]);

  return (
    <div>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </div>
  );
};

export default App;

