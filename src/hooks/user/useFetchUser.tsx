import axios from "axios";
import { useState } from "react";
import { DataResponse, ErrorResponse } from "../../types/responseTypes";
import { UserData } from "../../types/fetchUserTypes";

export default function useFetchUser() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = async (username: string) => {
    try {
      const response = await axios.get<DataResponse<UserData> | ErrorResponse>(`http://kloudcommit.com:8080/api/v1/user/${username}/`, {
        validateStatus: (status: number) => status == status,
      });

      if (response.status !== 200 || response.data.status !== "success") {
        const errorResponse = response.data as ErrorResponse;
        setError(errorResponse.error.message);
        return;
      }

      return response.data as DataResponse<UserData>;
    } catch (err) {
      setError(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchUser: fetch, isLoadingUser: isLoading, errorUser: error };
}
