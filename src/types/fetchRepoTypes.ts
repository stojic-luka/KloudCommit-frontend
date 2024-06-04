export interface RepoData {
  id: string;
  name: string;
  userId: string;
}

export interface RepoCommit {
  hash: string;
  date: string;
  message: string;
  refs: string;
  body: string;
  author_name: string;
  author_email: string;
}

export interface RepoContributions {
  color: string;
  contributionCount: number;
  date: string;
}

export interface RepoFiles {
  name: string;
  type: string[] | null;
  folders: RepoFiles[] | null;
}
