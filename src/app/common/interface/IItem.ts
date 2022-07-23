export type NewsStatus = 'published' | 'draft';

export interface IItem {
  id: string;
  title: string;
  slug: string;
  status: NewsStatus;
  content: string;
  date: string;
  categoryId: string;
  createAt: string;
}

export interface IPostItem {
  title: string;
  slug: string;
  status: NewsStatus;
  content: string;
  date: string;
  categoryId: string;
}
