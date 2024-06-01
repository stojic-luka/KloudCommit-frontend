import { useContext } from "react";
import { AuthContext } from "../../context/auth/authContext";
import { ACTION } from "../../types/contextTypes";
import { UserContext } from "../../context/auth/userContext";

export const useLogout = () => {
  const { authDispatch } = useContext(AuthContext);
  const { userDispatch } = useContext(UserContext);

  const logout = () => {
    sessionStorage.removeItem("token");
    authDispatch({ type: ACTION.LOGOUT });
    userDispatch({ type: ACTION.LOGOUT });
  };

  return { logout };
};
