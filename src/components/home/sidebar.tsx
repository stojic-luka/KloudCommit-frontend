import { RepoData } from "../../types/RepoTypes";

interface Props {
  repos: RepoData[];
}

export default function SideBar({ repos }: Props) {
  return (
    <div className="bg-gray-50 px-3 h-full">
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
