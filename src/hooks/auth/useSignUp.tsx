import { useContext, useState } from "react";
import axios from "axios";

import { DataResponse, ErrorResponse } from "../../types/responseTypes";
import { UserData } from "../../types/fetchUserTypes";
import { AuthContext } from "../../context/auth/authContext";
import { UserContext } from "../../context/auth/userContext";
import { ACTION } from "../../types/contextTypes";

interface AuthData {
  accessToken: string;
  user: UserData;
}

/**
 * Custom hook for handling user sign-up.
 *
 * @return {Object} An object containing the signUp function, isLoading state, and error state.
 */
export default function useSignUp(): object {
  const { authDispatch } = useContext(AuthContext);
  const { userDispatch } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Asynchronously signs up a user by making a POST request to the authentication API.
   *
   * @async
   * @param {string} username - The username of the user attempting to sign up.
   * @param {string} email - The email of the user attempting to sign up.
   * @param {string} passwordHash - The hashed password of the user.
   * @return {Promise<void>} A promise that resolves when the sign-up is complete.
   * @throws {Error} If there is an error during the sign-up process.
   */
  const signUp = async (username: string, email: string, passwordHash: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await axios.post<DataResponse<AuthData> | ErrorResponse>(
        "http://kloudcommit.com:8080/api/v1/auth/signup",
        {
          username: username,
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
      userDispatch({ type: ACTION.Login, payload: authResponse.data.user });
    } catch (err) {
      setError(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, isLoading, error };
}
