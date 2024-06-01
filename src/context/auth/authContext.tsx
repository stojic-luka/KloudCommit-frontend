import { createContext, useReducer, useEffect, ReactNode, Dispatch } from "react";
import { ACTION, LoginAction, LogoutAction } from "../../types/contextTypes";

interface AuthState {
  token: string | null;
}
interface TokenContextType extends AuthState {
  authDispatch: Dispatch<LogoutAction | LoginAction<AuthState>>;
}

export const AuthContext = createContext<TokenContextType>({ token: null, authDispatch: () => null });

const authReducer = (state: AuthState, action: LogoutAction | LoginAction<AuthState>): AuthState => {
  switch (action.type) {
    case ACTION.LOGIN:
      return { token: action.payload.token };
    case ACTION.LOGOUT:
      return { token: null };
    default:
      return state;
  }
};

interface Props {
  children: ReactNode;
}
export const AuthContextProvider = ({ children }: Props) => {
  const [authState, authDispatch] = useReducer(authReducer, { token: null });

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      authDispatch({ type: ACTION.LOGIN, payload: { token: token } });
    }
  }, []);

  return <AuthContext.Provider value={{ ...authState, authDispatch }}>{children}</AuthContext.Provider>;
};
