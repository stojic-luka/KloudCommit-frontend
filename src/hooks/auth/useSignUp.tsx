import { useContext, useState } from "react";
import axios from "axios";

import { DataResponse, ErrorResponse } from "../../types/responseTypes";
import { AuthContext } from "../../context/auth/authContext";
import { UserContext } from "../../context/auth/userContext";
import { ACTION } from "../../types/contextTypes";

interface AuthData {
  accessToken: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
}

export default function useSignUp() {
  const { authDispatch } = useContext(AuthContext);
  const { userDispatch } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const signUp = async (username: string, email: string, passwordHash: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post<DataResponse<AuthData> | ErrorResponse>(
        "http://cloudcommit.com:8080/api/v1/auth/signup",
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
      authDispatch({ type: ACTION.LOGIN, payload: { token: authResponse.data.accessToken } });
      userDispatch({ type: ACTION.LOGIN, payload: authResponse.data.user });
    } catch (err) {
      setError(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, isLoading, error };
}
