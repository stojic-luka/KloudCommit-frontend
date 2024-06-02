import { RepoData } from "../../types/fetchRepoTypes";

interface Props {
  repos: RepoData[];
}
/**
 * Renders the Sidebar component with user repositories list.
 *
 * @param {Props} props - The component props.
 * @param {RepoData[]} props.repos - The array of repository data.
 * @return {JSX.Element} The rendered BrowseReposSidebar component.
 */
export default function BrowseReposSidebar({ repos }: Props) {
  return (
    <div className="px-3 h-full">
      {repos
        ? repos.map((repo, index) => (
            <div key={index} className="border-1 rounded-lg border-slate-300 drop-shadow-md">
              <RepoCard repo={repo} />
            </div>
          ))
        : ""}
    </div>
  );
}

const RepoCard = ({ repo }: { repo: RepoData }) => {
  return (
    <>
      <h1>{repo.name}</h1>
      <p>ID: {repo.id}</p>
      <p>User: {repo.userId}</p>
    </>
  );
};
