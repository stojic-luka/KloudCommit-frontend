import { useState } from "react";
import axios from "axios";
import { DataResponse, ErrorResponse } from "../../types/responseTypes";
import { RepoFiles } from "../../types/fetchRepoTypes";

/**
 * Custom hook that fetches the files of a repository.
 *
 * @return {Object} An object containing the fetchRepoFiles function, isLoadingRepoFiles boolean, and errorRepoFiles string or null.
 */
export const useFetchRepoFiles = (): {
  fetchRepoFiles: (username: string, repo: string) => Promise<RepoFiles | void>;
  isLoadingRepoFiles: boolean;
  errorRepoFiles: string | null;
} => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches the list of files in a given repository for the specified user.
   *
   * @async
   * @param {string} repo - The name of the repository to fetch files from.
   * @returns {Promise<DataResponse<string[]> | void>} A promise that resolves to a DataResponse containing an array of file names
   * if the request is successful, or void if an error occurs.
   */
  const fetch = async (username: string, repo: string): Promise<RepoFiles | void> => {
    setIsLoading(true);
    try {
      const response = await axios.post<RepoFiles>(
        // `http://repo.kloudcommit.com:8080/api/v1/repos/${username}/${repo}/files`,
        "http://localhost:5173/repoFiles.json",
        { validateStatus: (status: number) => status == status }
      );

      // if (response.status !== 200 || response.data.status !== "success") {
      //   const errorResponse = response.data as ErrorResponse;
      //   setError(errorResponse.error.message);
      //   return;
      // }

      return response.data as RepoFiles;
    } catch (err) {
      setError(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchRepoFiles: fetch, isLoadingRepoFiles: isLoading, errorRepoFiles: error };
};
