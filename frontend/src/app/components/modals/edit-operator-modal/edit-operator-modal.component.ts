import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CreateUserCredentials, Operator } from "../../../operators/operators.service";
import { FormControl, Validators } from "@angular/forms";

export enum EDIT_MODE {
  EDIT = 'edit',
  CREATE = 'create'
}

interface DialogData {
  editMode: EDIT_MODE;
  operator: Operator;
}

@Component({
  selector: 'app-edit-operator-modal',
  templateUrl: './edit-operator-modal.component.html',
  styleUrls: ['./edit-operator-modal.component.css']
})
export class EditOperatorModalComponent implements OnInit {
  email!: FormControl;
  fullName!: FormControl;
  password!: FormControl;
  EDIT_MODE = EDIT_MODE;
  hide = true;

  @Output() confirm = new EventEmitter<CreateUserCredentials>();

  constructor(
    public dialogRef: MatDialogRef<EditOperatorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    const operator = this.prepareOperatorData();
    this.createForm(operator);
  }

  prepareOperatorData(): Omit<Operator, 'id'> {
    const operator = this.data.operator || {};

    return {
      email: operator.email || '',
      name: operator.name || '',
    };
  }

  createForm(operator: Omit<Operator, 'id'>) {
    this.email = new FormControl(operator.email, [Validators.required, Validators.email]);
    this.fullName = new FormControl(operator.name, [Validators.required]);

    if (this.data.editMode === EDIT_MODE.CREATE) {
      this.password = new FormControl(operator.name, [Validators.required]);
    }
  }

  onSave() {
    const operator: CreateUserCredentials = {
      email: this.email.value,
      name: this.fullName.value,
    };

    if (this.data.editMode === EDIT_MODE.CREATE) {
      operator.password = this.password.value;
    }

    this.confirm.emit(operator);
  }
}
