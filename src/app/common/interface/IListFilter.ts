export interface IListFilter {
  _page: number;
  _limit?: number;
  _sort?: string;
  _order?: string;
  q?: string;
}

export interface INewsFilter extends IListFilter {
  status?: string;
  createAt_gte?: string;
  createAt_lte?: string;
}
