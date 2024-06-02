import { createContext, useReducer, ReactNode, Dispatch, useEffect } from "react";
import { ACTION, LoginAction, LogoutAction } from "../../types/contextTypes";

interface UserState {
  id: string | null;
  email: string | null;
  username: string | null;
}
interface UsernameContextType extends UserState {
  userDispatch: Dispatch<LogoutAction | LoginAction<UserState>>;
}

export const UserContext = createContext<UsernameContextType>({ id: null, email: null, username: null, userDispatch: () => null });

const authReducer = (state: UserState, action: LogoutAction | LoginAction<UserState>): UserState => {
  switch (action.type) {
    case ACTION.Login:
      return {
        id: action.payload.id,
        email: action.payload.email,
        username: action.payload.username,
      };
    case ACTION.Logout:
      return { id: null, email: null, username: null };
    default:
      return state;
  }
};

interface Props {
  children: ReactNode;
}
export const UserContextProvider = ({ children }: Props) => {
  const [userState, userDispatch] = useReducer(authReducer, { id: null, email: null, username: null });

  useEffect(() => {
    const userString = sessionStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString) as UserState;
      userDispatch({ type: ACTION.Login, payload: user });
    }
  }, []);

  return <UserContext.Provider value={{ ...userState, userDispatch }}>{children}</UserContext.Provider>;
};
