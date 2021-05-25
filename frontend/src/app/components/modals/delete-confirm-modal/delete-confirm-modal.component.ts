import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirm-modal',
  templateUrl: './delete-confirm-modal.component.html',
  styleUrls: ['./delete-confirm-modal.component.css']
})
export class DeleteConfirmModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmModalComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirm() {
    this.dialogRef.close(true);
  }
}
