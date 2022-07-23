import { Component, OnInit } from '@angular/core';
import { IListFilter } from 'src/app/common/interface/IListFilter';
import { CategoryApiService } from 'src/app/common/service/category-api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  public filter: IListFilter = {
    _page: 1,
    _limit: 5,
  };

  constructor(private _categoryService: CategoryApiService) {}

  ngOnInit(): void {
    // this._categoryService.getCategoryListNoPagination().subscribe((data) => {
    //   console.log(data);
    // });
    this._categoryService.getCategoryList(this.filter).subscribe((data) => {
      console.log(data);
    });
  }
}
