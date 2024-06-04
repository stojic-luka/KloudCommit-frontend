import { useState } from "react";
import axios from "axios";
import { DataResponse, ErrorResponse } from "../../types/responseTypes";
import { RepoCommit } from "../../types/fetchRepoTypes";

/**
 * Custom hook that fetches the commits for a given repository.
 *
 * @return {Object} An object containing the fetchRepoCommits function, isLoadingRepoCommits boolean, and errorRepoCommits string or null.
 */
export const useFetchRepoCommits = (): object => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches the commits for a given repository.
   *
   * @async
   * @param {string} repo - The name of the repository.
   * @param {string | undefined} [sha=undefined] - The SHA of the commit to fetch. If not provided, fetches all commits.
   * @returns {Promise<DataResponse<RepoCommit[] | RepoCommit> | void>} A promise that resolves to a DataResponse containing an array of RepoCommit objects
   * if the request is successful, or void if an error occurs. If a SHA is provided, returns a DataResponse containing a single RepoCommit object.
   */
  const fetch = async (
    username: string,
    repo: string,
    sha: string | undefined = undefined
  ): Promise<DataResponse<RepoCommit[] | RepoCommit> | void> => {
    setIsLoading(true);
    try {
      const response = await axios.post<DataResponse<RepoCommit[] | RepoCommit> | ErrorResponse>(
        `http://repo.kloudcommit.com:8080/api/v1/repos/${username}/${repo}/commits/${sha || ""}`,
        { validateStatus: (status: number) => status == status }
      );

      if (response.status !== 200 || response.data.status !== "success") {
        const errorResponse = response.data as ErrorResponse;
        setError(errorResponse.error.message);
        return;
      }

      if (sha) return response.data as DataResponse<RepoCommit>;
      else return response.data as DataResponse<RepoCommit[]>;
    } catch (err) {
      setError(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchRepoCommits: fetch, isLoadingRepoCommits: isLoading, errorRepoCommits: error };
};
