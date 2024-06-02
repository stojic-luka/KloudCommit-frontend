import { useContext } from "react";
import { AuthContext } from "../../context/auth/authContext";
import { ACTION } from "../../types/contextTypes";
import { UserContext } from "../../context/auth/userContext";

/**
 * Custom hook that provides a function to log out a user.
 *
 * @returns {Object} An object containing the logout function.
 */
export const useLogout = () => {
  const { authDispatch } = useContext(AuthContext);
  const { userDispatch } = useContext(UserContext);

  const logout = () => {
    sessionStorage.removeItem("token");
    authDispatch({ type: ACTION.Logout });
    userDispatch({ type: ACTION.Logout });
  };

  return { logout };
};
