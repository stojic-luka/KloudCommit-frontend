import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";

import NavBar from "./components/common/navbar";
import Footer from "./components/common/footer";
import { AuthContext } from "./context/auth/authContext";

import "../index.css";

function App() {
  const { token } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <NavBar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
            <Route path="/test1" element={token ? <h1></h1> : <Navigate to="/login" />} />
            <Route path="/test2" element={token ? <h1></h1> : <Navigate to="/login" />} />
            <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
