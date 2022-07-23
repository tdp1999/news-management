export interface IListFilter {
  _page: number;
  _limit?: number;
  _sort?: string;
  _order?: string;
  q?: string;
}
