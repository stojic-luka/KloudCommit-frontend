import { useState } from "react";
import axios from "axios";
import { DataResponse, ErrorResponse } from "../../types/responseTypes";

/**
 * Custom hook that fetches the list of branches in a given repository for the specified user.
 *
 * @return {Object} An object containing the fetchRepoBranches function, isLoadingRepoBranches boolean, and errorRepoBranches string or null.
 */
export const useFetchRepoBranches = (): object => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches the list of branches in a given repository for the specified user.
   *
   * @async
   * @param {string} repo - The name of the repository to fetch branches from.
   * @returns {Promise<DataResponse<string[]> | void>} A promise that resolves to a DataResponse containing an array of branch names
   * if the request is successful, or void if an error occurs.
   */
  const fetch = async (username: string, repo: string): Promise<DataResponse<string[]> | void> => {
    setIsLoading(true);
    try {
      const response = await axios.post<DataResponse<string[]> | ErrorResponse>(
        `http://repo.kloudcommit.com:8080/api/v1/repos/${username}/${repo}/branches`,
        { validateStatus: (status: number) => status == status }
      );

      if (response.status !== 200 || response.data.status !== "success") {
        const errorResponse = response.data as ErrorResponse;
        setError(errorResponse.error.message);
        return;
      }

      return response.data as DataResponse<string[]>;
    } catch (err) {
      setError(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchRepoBranches: fetch, isLoadingRepoBranches: isLoading, errorRepoBranches: error };
};
