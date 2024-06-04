import { createContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import useFetchUser from "../hooks/user/useFetchUser";
import { UserData } from "../types/fetchUserTypes";

import TabView, { Tab } from "../components/user/tabView";
import ProfileTab from "../components/user/profileTab";

import "./styles/userViewStyles.css";
import RepoTab from "../components/user/repoTab";

export const UserViewContext = createContext<{ user: UserData | null }>({ user: null });

/**
 * Renders the UserView component which displays user information and their repositories.
 *
 * @returns {JSX.Element} The rendered UserView component.
 */
export default function UserView(): JSX.Element {
  const { username } = useParams();

  const [user, setUser] = useState<UserData>();
  const { fetchUser, isLoadingUser, errorUser } = useFetchUser();

  useEffect(() => {
    (async () => {
      if (username) {
        const responseUser = await fetchUser(username);
        if (responseUser?.data) setUser(responseUser.data);
      }
    })();
  }, []);

  if (isLoadingUser) return <div>Loading...</div>;
  if (!user || errorUser) return <Navigate to="/404" />;

  // TODO: add created at to the server
  user.createdAt = new Date(2021, 1, 1);

  return (
    <div className="flex flex-row h-full">
      <div className="container-lg">
        <UserViewContext.Provider value={{ user }}>
          <TabView>
            <Tab label="Profile">
              <span className="text-red-500">Contributions data is generated and only has a purpouse of showcase</span>
              <ProfileTab />
            </Tab>
            <Tab label="Repositories">
              <RepoTab />
            </Tab>
          </TabView>
        </UserViewContext.Provider>
      </div>
    </div>
  );
}
