export type NewsStatus = 'published' | 'draft';

export interface IItem {
  id: string;
  title: string;
  status: string;
  content: string;
  date: string;
  categoryId: string;
}
