import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CreateServiceCredentials, Service } from "../../../services/services.service";
import { FormControl, Validators } from "@angular/forms";

export enum EDIT_MODE {
  EDIT = 'edit',
  CREATE = 'create'
}

interface DialogData {
  editMode: EDIT_MODE;
  isGroup: boolean;
  service: Omit<Service, 'id'>;
}

@Component({
  selector: 'app-edit-service-modal',
  templateUrl: './edit-service-modal.component.html',
  styleUrls: ['./edit-service-modal.component.css']
})
export class EditServiceModalComponent implements OnInit {
  name!: FormControl;
  description!: FormControl;
  EDIT_MODE = EDIT_MODE;

  @Output() confirm = new EventEmitter<CreateServiceCredentials>();

  constructor(
    public dialogRef: MatDialogRef<EditServiceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    const service = this.prepareServiceData();
    this.createForm(service);
  }

  prepareServiceData(): Omit<Service, 'id'> {
    const service = this.data.service || {};

    return {
      name: service.name || '',
      description: service.description || '',
      isGroup: this.data.isGroup,
  };
  }

  createForm(service: Omit<Service, 'id'>) {
    this.name = new FormControl(service.name, [Validators.required]);
    this.description = new FormControl(service.description);
  }

  onSave() {
    this.confirm.emit({
      name: this.name.value,
      description: this.description.value,
      isGroup: this.data.isGroup,
    });
  }
}
