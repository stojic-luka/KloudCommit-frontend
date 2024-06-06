import { useCallback, useEffect, useState } from "react";

import { useFetchRepoFiles } from "../../hooks/repo/useFetchRepoFiles";
import { RepoFiles } from "../../types/fetchRepoTypes";
import { useLocation, useNavigate } from "react-router-dom";

export const FileBrowser = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [files, setFiles] = useState<RepoFiles>();
  const [currentPath, setCurrentPath] = useState<string>("/");
  const [pathError, setPathError] = useState<boolean>();
  const { fetchRepoFiles, isLoadingRepoFiles, errorRepoFiles } = useFetchRepoFiles();

  const getDirectoryChildren = useCallback(
    (path: string): RepoFiles => {
      if (!currentPath && files) {
        const filesArr = files.files?.sort((a, b) => a.localeCompare(b));
        const foldersArr = files.folders?.sort((a, b) => a.name.localeCompare(b.name));
        return {
          name: "",
          files: filesArr as string[],
          folders: foldersArr as RepoFiles[],
        };
      }

      const res = path
        .split("/")
        .filter((p) => p)
        .reduce<RepoFiles | undefined | null>((o, k) => {
          return o?.folders && o.folders.find((folder) => folder.name === k);
        }, files);

      if (res) return res;
      setPathError(true);
      return { name: "", files: null, folders: null };
    },
    [files]
  );

  const handleOpenFile = (fileName: string) => {
    console.log(fileName);
  };
  const handlePathAdvance = (pathEnd: string) => setCurrentPath((path) => `${path}/${pathEnd}`);
  const handlePathRetrace = () => {
    if (currentPath.length > 1) {
      const newPath = currentPath.slice(0, -1);
      const lastSlashIndex = newPath.lastIndexOf("/");
      if (lastSlashIndex !== -1) {
        setCurrentPath((path) => path.substring(0, lastSlashIndex));
      }
    }
  };

  useEffect(() => {
    (async () => {
      const response = await fetchRepoFiles("", "");
      if (response) setFiles(response);
    })();

    const params = new URLSearchParams(location.search);
    let paramsPath = params.get("path");
    if (paramsPath) {
      const editedPath = paramsPath
        .split("/")
        .filter((p) => p)
        .join("/");
      setCurrentPath("/" + editedPath);
    }
  }, []);

  useEffect(() => {
    const paramPath = currentPath.slice(2);
    navigate(currentPath.length > 1 ? `?path=${paramPath}` : "", { replace: true });
  }, [currentPath]);

  if (!files || isLoadingRepoFiles || errorRepoFiles || pathError) return <div></div>;
  console.log(pathError);
  if (pathError) return <div>path not exist</div>;

  const repoFiles = getDirectoryChildren(currentPath);

  return (
    <div>
      {currentPath.length > 1 && (
        <div onClick={handlePathRetrace}>
          <button typeof="back">..</button>
        </div>
      )}
      {repoFiles.folders?.map((repoFolder, index) => (
        <div key={index}>
          <button onClick={() => handlePathAdvance(repoFolder.name)}>{repoFolder.name}</button>
        </div>
      ))}
      {repoFiles.files?.map((repoFile, index) => (
        <div key={index}>
          <button onClick={() => handleOpenFile(repoFile)}>{repoFile}</button>
        </div>
      ))}
    </div>
  );
};
