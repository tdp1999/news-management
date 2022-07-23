import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory, IPostCategory } from '../interface/ICategory';
import { IListFilter } from '../interface/IListFilter';
import { IPagination } from '../interface/IPagination';

@Injectable({
  providedIn: 'root',
})
export class CategoryApiService {
  private _apiUrl = environment.apiUrl + 'category/';

  constructor(private _http: HttpClient) {}

  getCategoryListNoPagination(): Observable<ICategory[]> {
    return this._http.get<ICategory[]>(this._apiUrl);
  }

  getCategoryList(filter: IListFilter): Observable<IPagination<ICategory[]>> {
    let queryParam = new HttpParams({ fromObject: filter as {} });
    return this._http.get<IPagination<ICategory[]>>(this._apiUrl, {
      params: queryParam,
    });
  }

  retrieveCategoryByID(id: string): Observable<ICategory> {
    return this._http.get<ICategory>(this._apiUrl + id);
  }

  addCategory(category: IPostCategory): Observable<ICategory> {
    return this._http.post<ICategory>(this._apiUrl, category);
  }

  updateCategory(category: ICategory): Observable<ICategory> {
    return this._http.put<ICategory>(this._apiUrl + category.id, category);
  }

  patchCategoryByID(id: string, category: ICategory): Observable<ICategory> {
    return this._http.patch<ICategory>(this._apiUrl + id, category);
  }

  deleteCategoryByID(id: string): Observable<any> {
    console.log(id);
    return this._http.delete(this._apiUrl + id);
  }
}
