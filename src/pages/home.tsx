import { useEffect, useState } from "react";
import useFetchRepos from "../hooks/repo/useFetchRepos";
import { RepoData } from "../types/RepoTypes";

import SideBar from "../components/home/sidebar";

export default function Home() {
  const [repos, setRepos] = useState<RepoData[]>([]);

  const { fetchRepos, isLoadingRepos, errorRepos } = useFetchRepos();

  useEffect(() => {
    (async () => {
      const response = await fetchRepos();
      setRepos(response?.data || []);
    })();
  }, []);

  return (
    <div className="flex flex-row h-full">
      <SideBar repos={repos} />
    </div>
  );
}
