export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  tags: string[];
  body: string;
  html: string;
}

export interface BlogFrontmatter {
  title: string;
  description: string;
  author?: string;
  date?: string;
  tags?: string[] | string;
}
