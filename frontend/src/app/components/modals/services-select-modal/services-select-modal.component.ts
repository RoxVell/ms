import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Service } from "../../../services/services.service";
import { Observable } from "rxjs";
import { first, map } from "rxjs/operators";
import { MatCheckboxChange } from "@angular/material/checkbox";

interface DialogData {
  services: Observable<Service[]>;
}

@Component({
  selector: 'app-services-select-modal',
  templateUrl: './services-select-modal.component.html',
  styleUrls: ['./services-select-modal.component.css']
})
export class ServicesSelectModalComponent {
  @Output() save = new EventEmitter<number[]>();

  checkedItemIds: number[] = [];

  constructor(
    public dialogRef: MatDialogRef<ServicesSelectModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onSave() {
    this.save.emit(this.checkedItemIds);
  }

  onCheckItem(service: Service, changeEvent: MatCheckboxChange) {
    const checked = changeEvent.checked;

    if (checked) {
      this.checkedItemIds.push(service.id);
    } else {
      const index = this.checkedItemIds.findIndex(id => service.id === id);

      if (index !== -1) {
        this.checkedItemIds.splice(index, 1);
      }
    }
  }
}
