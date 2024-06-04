import { useState } from "react";
import axios from "axios";
import { DataResponse, ErrorResponse } from "../../types/responseTypes";
import { RepoData } from "../../types/fetchRepoTypes";

// TODO: finish server repo data fetch endpoint on server
const useFetchRepoData = (): {
  fetchRepoData: (username: string, repo: string) => Promise<DataResponse<string[]> | void>;
  isLoadingRepoData: boolean;
  errorRepoData: string | null;
} => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = async (username: string, repo: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post<DataResponse<RepoData[]> | ErrorResponse>(
        `http://repo.kloudcommit.com:8080/api/v1/repos/${username}/${repo}`,
        { validateStatus: (status: number) => status == status }
      );

      if (response.status !== 200 || response.data.status !== "success") {
        const errorResponse = response.data as ErrorResponse;
        setError(errorResponse.error.message);
        return;
      }

      const reposResponse = response.data as DataResponse<RepoData[]>;
    } catch (err) {
      setError(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchRepoData: fetch, isLoadingRepoData: isLoading, errorRepoData: error };
};
