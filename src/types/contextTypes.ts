export enum ACTION {
  Login = "login",
  Logout = "logout",
}

export interface LoginAction<T> {
  type: ACTION.Login;
  payload: T;
}
export interface LogoutAction {
  type: ACTION.Logout;
}
