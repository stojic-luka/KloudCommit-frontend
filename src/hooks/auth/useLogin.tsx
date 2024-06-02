import { useContext, useState } from "react";
import axios from "axios";

import { DataResponse, ErrorResponse } from "../../types/responseTypes";
import { AuthContext } from "../../context/auth/authContext";
import { ACTION } from "../../types/contextTypes";
import { UserContext } from "../../context/auth/userContext";
import { UserData } from "../../types/fetchUserTypes";

interface AuthData {
  accessToken: string;
  user: UserData;
}

/**
 * Custom hook for handling user login.
 *
 * @return {Object} An object containing the login function, isLoading state, and error state.
 */
export default function useLogin(): object {
  const { authDispatch } = useContext(AuthContext);
  const { userDispatch } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Asynchronously logs in a user by making a POST request to the authentication API.
   *
   * @async
   * @param {string} email - The email of the user attempting to log in.
   * @param {string} passwordHash - The hashed password of the user.
   * @returns {Promise<void>} A promise that resolves when the login process is complete.
   */
  const login = async (email: string, passwordHash: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await axios.post<DataResponse<AuthData> | ErrorResponse>(
        "http://kloudcommit.com:8080/api/v1/auth/login",
        {
          email: email,
          passwordHash: passwordHash,
        },
        { validateStatus: (status) => status == status }
      );

      if (response.status !== 200 || response.data.status !== "success") {
        const errorResponse = response.data as ErrorResponse;
        setError(errorResponse.error.message);
        return;
      }

      const authResponse = response.data as DataResponse<AuthData>;

      sessionStorage.setItem("token", authResponse.data.accessToken);
      authDispatch({ type: ACTION.Login, payload: { token: authResponse.data.accessToken } });

      sessionStorage.setItem("user", JSON.stringify(authResponse.data.user));
      userDispatch({ type: ACTION.Login, payload: authResponse.data.user });
    } catch (err) {
      setError(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}
