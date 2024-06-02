import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/auth/userContext";
import { DataResponse, ErrorResponse } from "../../types/responseTypes";
import { RepoData, RepoCommit } from "../../types/fetchRepoTypes";

// TODO: finish server repo data fetch endpoint on server
const useFetchRepoData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { username } = useContext(UserContext);

  const fetch = async (repo: string) => {
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

/**
 * Custom hook that fetches the files of a repository.
 *
 * @return {Object} An object containing the fetchRepoFiles function, isLoadingRepoFiles boolean, and errorRepoFiles string or null.
 */
export const useFetchRepoFiles = (): object => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { username } = useContext(UserContext);

  /**
   * Fetches the list of files in a given repository for the specified user.
   *
   * @async
   * @param {string} repo - The name of the repository to fetch files from.
   * @returns {Promise<DataResponse<string[]> | void>} A promise that resolves to a DataResponse containing an array of file names
   * if the request is successful, or void if an error occurs.
   */
  const fetch = async (repo: string): Promise<DataResponse<string[]> | void> => {
    setIsLoading(true);
    try {
      const response = await axios.post<DataResponse<string[]> | ErrorResponse>(
        `http://repo.kloudcommit.com:8080/api/v1/repos/${username}/${repo}/files`,
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

  return { fetchRepoFiles: fetch, isLoadingRepoFiles: isLoading, errorRepoFiles: error };
};

/**
 * Custom hook that fetches the commits for a given repository.
 *
 * @return {Object} An object containing the fetchRepoCommits function, isLoadingRepoCommits boolean, and errorRepoCommits string or null.
 */
export const useFetchRepoCommits = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { username } = useContext(UserContext);

  /**
   * Fetches the commits for a given repository.
   *
   * @async
   * @param {string} repo - The name of the repository.
   * @param {string | undefined} [sha=undefined] - The SHA of the commit to fetch. If not provided, fetches all commits.
   * @returns {Promise<DataResponse<RepoCommit[] | RepoCommit> | void>} A promise that resolves to a DataResponse containing an array of RepoCommit objects
   * if the request is successful, or void if an error occurs. If a SHA is provided, returns a DataResponse containing a single RepoCommit object.
   */
  const fetch = async (repo: string, sha: string | undefined = undefined): Promise<DataResponse<RepoCommit[] | RepoCommit> | void> => {
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

/**
 * Custom hook that fetches the list of branches in a given repository for the specified user.
 *
 * @return {Object} An object containing the fetchRepoBranches function, isLoadingRepoBranches boolean, and errorRepoBranches string or null.
 */
export const useFetchRepoBranches = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { username } = useContext(UserContext);

  /**
   * Fetches the list of branches in a given repository for the specified user.
   *
   * @async
   * @param {string} repo - The name of the repository to fetch branches from.
   * @returns {Promise<DataResponse<string[]> | void>} A promise that resolves to a DataResponse containing an array of branch names
   * if the request is successful, or void if an error occurs.
   */
  const fetch = async (repo: string): Promise<DataResponse<string[]> | void> => {
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
