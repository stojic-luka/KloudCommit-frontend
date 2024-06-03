import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Home, Login, UserView, RepoView, PageNotFound } from "./pages";
import NavBar from "./components/common/navbar";
import Footer from "./components/common/footer";
import { AuthContext } from "./context/auth/authContext";

import "../index.css";

export default function App() {
  const { token } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <BrowserRouter>
        <NavBar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
            <Route path="/:username" element={<UserView />} />
            <Route path="/:username/:repoName" element={<RepoView />} />
            <Route path="/:username/:repoName/tree/:repoBranch/*" element={<RepoView />} />
            <Route path="/404" element={<PageNotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
