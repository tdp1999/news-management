import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActionType } from 'src/app/common/interface/table/EAction';

export interface DialogData {
  title: string;
  action: ActionType;
  callback?: (data: any) => void;
  thisRef?: any;
  payload?: any;
}

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCategoryDialogComponent implements OnInit {
  public form!: FormGroup;
  public title = '';
  public submitText = 'OK';

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this._dialogRef.updateSize('60%');
    this.title = this.data.title;

    switch (this.data.action) {
      case ActionType.CREATE:
        this.submitText = 'Add';
        this.form = this._fb.group({
          title: [''],
        });
        break;
      case ActionType.EDIT:
        this.submitText = 'Save';
        this.form = this._fb.group({
          id: [this.data.payload.id],
          title: [this.data.payload.title],
          createAt: [this.data.payload.createAt],
        });
        break;
    }
  }
  submitForm() {
    this.data.callback?.bind(this.data.thisRef)(this.form.value);
  }
}
