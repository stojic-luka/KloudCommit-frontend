import axios from "axios";
import { useState } from "react";
import { RepoContributions } from "../../types/fetchRepoTypes";
import { ErrorResponse } from "../../types/responseTypes";

export const useFetchUserContributions = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = async (username: string) => {
    setIsLoading(true);
    try {
      /**
       * The url will be changed to server API after that route is added
       */
      const response = await axios.post<RepoContributions[] | ErrorResponse>(
        // `http://repo.kloudcommit.com:8080/api/v1/repos/${username}/events`,
        `contributions.json`,
        { validateStatus: (status: number) => status == status }
      );

      //   if (response.status !== 200 || response.data.status !== "success") {
      //     const errorResponse = response.data as ErrorResponse;
      //     setError(errorResponse.error.message);
      //     return;
      //   }

      return response.data as RepoContributions[];
    } catch (err) {
      setError(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchRepoContributions: fetch, isLoadingRepoContributions: isLoading, errorRepoContributions: error };
};
