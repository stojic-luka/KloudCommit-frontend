import { useContext, useRef } from "react";
import { AuthContext } from "../../context/auth/authContext";
import NavbarUserMenu from "./userDropdownMenu";

export default function Navbar() {
  const navbarRef = useRef<HTMLDivElement>(null);
  const { token } = useContext(AuthContext);

  return (
    <header ref={navbarRef} className="bg-gray-900 text-white py-2 px-5 flex justify-between items-center">
      <div className="text-2xl font-bold">CloudCommit</div>
      <nav className="flex space-x-5">
        <a href="#">Pull requests</a>
        <a href="#">Issues</a>
        <a href="#">Marketplace</a>
        <a href="#">Explore</a>
        {token && <NavbarUserMenu navbarRef={navbarRef} />}
      </nav>
    </header>
  );
}
