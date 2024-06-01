import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/auth/userContext";
import { DataResponse, ErrorResponse } from "../../types/responseTypes";

interface RepoData {
  id: string;
  name: string;
  userId: string;
}

export default function useFetchRepos() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { username } = useContext(UserContext);

  const fetch = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<DataResponse<RepoData[]> | ErrorResponse>(`http://repo.cloudcommit.com:8080/api/v1/repos/${username}/`, {
        validateStatus: (status: number) => status == status,
      });

      if (response.status !== 200 || response.data.status !== "success") {
        const errorResponse = response.data as ErrorResponse;
        setError(errorResponse.error.message);
        return;
      }

      return response.data as DataResponse<RepoData[]>;
    } catch (err) {
      setError(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchRepos: fetch, isLoadingRepos: isLoading, errorRepos: error };
}
