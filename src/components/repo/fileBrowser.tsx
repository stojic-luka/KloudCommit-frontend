import { useCallback, useEffect, useState } from "react";

import { useFetchRepoFiles } from "../../hooks/repo/useFetchRepoFiles";
import { RepoFiles } from "../../types/fetchRepoTypes";

export const FileBrowser = () => {
  const [files, setFiles] = useState<RepoFiles[]>();
  const [currentPath, setCurrentPath] = useState<string>("/");
  const [pathError, setPathError] = useState<boolean>(false);
  const { fetchRepoFiles, isLoadingRepoFiles, errorRepoFiles } = useFetchRepoFiles();

  const getDirectoryChildren = useCallback((path: string): RepoFiles[] => {
    const parts = path.split("/").filter((part) => part);
    console.log(parts);
    let current: RepoFiles[] | undefined = files;

    for (let i = 0; i < parts.length; i++) {
      if (!current || !current.includes(part)) {
        setPathError(true);
        return [];
      }
    }

    console.log(current);
    return current || [];
  }, []);

  useEffect(() => {
    (async () => {
      const response = await fetchRepoFiles("", "");
      if (response) setFiles(response);
    })();
  }, []);

  if (isLoadingRepoFiles || errorRepoFiles || pathError) return <div></div>;

  return (
    <div>
      {getDirectoryChildren(currentPath || "").map((item, index) => (
        <div></div>
      ))}
    </div>
  );
};
