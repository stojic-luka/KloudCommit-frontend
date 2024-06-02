// import axios from "axios";
// import { useContext, useState } from "react";
// import { UserContext } from "../../context/auth/userContext";
// import { DataResponse, ErrorResponse } from "../../types/responseTypes";
// import { RepoData } from "../../types/fetchRepoTypes";

// export default function useFetchRepo() {
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const { username } = useContext(UserContext);

//   const fetch = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get<DataResponse<RepoData[]> | ErrorResponse>(`http://kloudcommit.com:8080/api/v1/${username}/`, {
//         validateStatus: (status: number) => status == status,
//       });

//       if (response.status !== 200 || response.data.status !== "success") {
//         const errorResponse = response.data as ErrorResponse;
//         setError(errorResponse.error.message);
//         return;
//       }

//       return response.data as DataResponse<RepoData[]>;
//     } catch (err) {
//       setError(String(err));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { fetchRepos: fetch, isLoadingRepos: isLoading, errorRepos: error };
// }
