import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import useFetchUser from "../hooks/user/useFetchUser";
import useFetchRepos from "../hooks/repo/useFetchRepos";
import { UserData } from "../types/fetchUserTypes";
import { RepoData } from "../types/fetchRepoTypes";

import BrowseReposSidebar from "../components/home/browseReposSidebar";
import TabView, { Tab } from "../components/user/tabView";
import ProfileTab from "../components/user/profileTab";

import "./styles/userViewStyles.css";

/**
 * Renders the UserView component which displays user information and their repositories.
 *
 * @returns {JSX.Element} The rendered UserView component.
 */
export default function UserView(): JSX.Element {
  const { username } = useParams();

  const [user, setUser] = useState<UserData>();
  const { fetchUser, isLoadingUser, errorUser } = useFetchUser();

  const [repos, setRepos] = useState<RepoData[]>();
  const { fetchRepos, isLoadingRepos, errorRepos } = useFetchRepos();

  useEffect(() => {
    (async () => {
      if (username) {
        // const [responseUser, responseRepos] = await Promise.all([fetchUser(username), fetchRepos(username)]);
        // if (responseUser?.data) setUser(responseUser.data);
        // if (responseRepos?.data) setRepos(responseRepos?.data);

        /**
         * if repos fetch before user it causes component to re-render
         * and cause (!user || errorUser) to be true
         * which redirects page to "/404" route
         */
        const responseUser = await fetchUser(username);
        if (responseUser?.data) setUser(responseUser.data);

        const responseRepos = await fetchRepos(username);
        if (responseRepos?.data) setRepos(responseRepos?.data);
      }
    })();
  }, []);

  if (isLoadingUser) return <div>Loading...</div>;
  if (!user || errorUser) return <Navigate to="/404" />;

  // TODO: add created at to the server
  user.createdAt = new Date(2020, 1, 1);

  return (
    <div className="flex flex-row h-full">
      <div className="container-lg">
        <TabView>
          <Tab label="Profile">
            <ProfileTab createdAtYear={user.createdAt.getFullYear()} />
          </Tab>
          <Tab label="Repositories">
            {isLoadingRepos ? (
              <span className="mx-auto">Loading repos...</span>
            ) : errorRepos || !repos ? (
              <span className="mx-auto">Error loading repos</span>
            ) : (
              <BrowseReposSidebar repos={repos} />
            )}
          </Tab>
        </TabView>
      </div>
    </div>
  );
}
