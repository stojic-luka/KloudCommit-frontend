import { useContext, useEffect, useState } from "react";

import { UserViewContext } from "../../pages/userView";
import useFetchRepos from "../../hooks/repo/useFetchRepos";
import { RepoData } from "../../types/fetchRepoTypes";
import BrowseReposSidebar from "../home/browseReposSidebar";

/**
 * Renders the UserView component which displays user information and their repositories.
 *
 * @returns {JSX.Element} The rendered UserView component.
 */
export default function RepoTab() {
  const [repos, setRepos] = useState<RepoData[]>();
  const { fetchRepos, isLoadingRepos, errorRepos } = useFetchRepos();
  const { user } = useContext(UserViewContext);

  if (!user) return null;

  useEffect(() => {
    (async () => {
      const responseRepos = await fetchRepos(user.username);
      if (responseRepos?.data) setRepos(responseRepos?.data);
    })();
  }, []);

  return (
    <div className="flex flex-row h-full">
      {isLoadingRepos ? (
        <span className="mx-auto">Loading repos...</span>
      ) : errorRepos || !repos ? (
        <span className="mx-auto">Error loading repos</span>
      ) : (
        <BrowseReposSidebar repos={repos} />
      )}
    </div>
  );
}
