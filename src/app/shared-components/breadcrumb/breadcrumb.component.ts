import { Component, Input, OnInit } from '@angular/core';
import { IBreadcrumb } from 'src/app/common/interface/IBreadcrumb';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  @Input() breadcrumbItems: IBreadcrumb[] = [];

  constructor() {}

  ngOnInit(): void {}
}
