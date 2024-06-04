import { FileBrowser } from "../components/repo/fileBrowser";

export default function RepoView() {
  // const { username, repoName, repoBranch, "*": repoPath } = useParams();
  // console.log({ username: username, repoName: repoName, repoBranch: repoBranch, repoPath: repoPath });

  return (
    <div>
      <FileBrowser />
    </div>
  );
}
