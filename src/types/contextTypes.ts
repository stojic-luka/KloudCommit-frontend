export enum ACTION {
  LOGIN = "login",
  LOGOUT = "logout",
}

export interface LoginAction<T> {
  type: ACTION.LOGIN;
  payload: T;
}
export interface LogoutAction {
  type: ACTION.LOGOUT;
}
