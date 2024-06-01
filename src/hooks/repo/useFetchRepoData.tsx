import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/auth/userContext";
import { DataResponse, ErrorResponse } from "../../types/responseTypes";

interface RepoData {
  id: string;
  name: string;
  userId: string;
}

export const useFetchRepoData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { username } = useContext(UserContext);

  const fetch = async (repo: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post<DataResponse<RepoData[]> | ErrorResponse>(
        `http://repo.cloudcommit.com:8080/api/v1/repos/${username}/${repo}`,
        {
          validateStatus: (status: number) => status == status,
        }
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

  return { fetch, isLoading, error };
};

export const useFetchRepoFiles = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { username } = useContext(UserContext);

  const fetch = async (repo: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post<DataResponse<RepoData[]> | ErrorResponse>(
        `http://repo.cloudcommit.com:8080/api/v1/repos/${username}/${repo}/files`,
        {
          validateStatus: (status: number) => status == status,
        }
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

  return { fetch, isLoading, error };
};

export const useFetchRepoCommits = (sha: string | undefined = undefined) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { username } = useContext(UserContext);

  const fetch = async (repo: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post<DataResponse<RepoData[]> | ErrorResponse>(
        `http://repo.cloudcommit.com:8080/api/v1/repos/${username}/${repo}/commits/${sha || ""}`,
        {
          validateStatus: (status: number) => status == status,
        }
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

  return { fetch, isLoading, error };
};

export const useFetchRepoBranches = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { username } = useContext(UserContext);

  const fetch = async (repo: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post<DataResponse<RepoData[]> | ErrorResponse>(
        `http://repo.cloudcommit.com:8080/api/v1/repos/${username}/${repo}/branches`,
        {
          validateStatus: (status: number) => status == status,
        }
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

  return { fetch, isLoading, error };
};
