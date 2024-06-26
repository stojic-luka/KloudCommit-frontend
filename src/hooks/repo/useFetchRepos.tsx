import { useState } from "react";
import axios from "axios";
import { DataResponse, ErrorResponse } from "../../types/responseTypes";
import { RepoData } from "../../types/fetchRepoTypes";

export default function useFetchRepos() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = async (username: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get<DataResponse<RepoData[]> | ErrorResponse>(`http://repo.kloudcommit.com:8080/api/v1/repos/${username}/`, {
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
