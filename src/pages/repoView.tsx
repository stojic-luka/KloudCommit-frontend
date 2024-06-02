import { useParams } from "react-router-dom";

export default function RepoView() {
  const { username, repoName, repoBranch, "*": repoPath } = useParams();

  console.log({ username: username, repoName: repoName, repoBranch: repoBranch, repoPath: repoPath });

  return <div></div>;
}
