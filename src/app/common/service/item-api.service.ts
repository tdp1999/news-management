import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IItem, IPostItem } from '../interface/IItem';
import { IListFilter } from '../interface/IListFilter';
import { IPagination } from '../interface/IPagination';

@Injectable({
  providedIn: 'root',
})
export class ItemApiService {
  private _url = environment.apiUrl + 'item/';

  constructor(private _http: HttpClient) {}

  getItemList(filter: IListFilter): Observable<IPagination<IItem[]>> {
    let queryParam = new HttpParams({ fromObject: filter as {} });
    return this._http.get<IPagination<IItem[]>>(this._url, {
      params: queryParam,
    });
  }

  retrieveItem(id: string): Observable<IItem> {
    return this._http.get<IItem>(this._url + id);
  }

  retrieveItemBySlug(slug: string): Observable<[IItem] | []> {
    return this._http.get<[IItem] | []>(this._url + `?slug=${slug}`);
  }

  addItem(item: IPostItem): Observable<IItem> {
    return this._http.post<IItem>(this._url, item);
  }

  updateItem(item: IItem): Observable<IItem> {
    return this._http.put<IItem>(this._url + item.id, item);
  }

  patchItem(item: Partial<IItem>): Observable<IItem> {
    return this._http.patch<IItem>(this._url + item.id, item);
  }

  deleteItemByID(id: string): Observable<IItem> {
    return this._http.delete<IItem>(this._url + id);
  }
}
