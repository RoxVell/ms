import { Component, OnInit } from '@angular/core';
import { Operator, OperatorsService } from "../operators.service";
import { MatDialog } from "@angular/material/dialog";
import { DeleteConfirmModalComponent } from "../../components/modals/delete-confirm-modal/delete-confirm-modal.component";
import {
  EDIT_MODE,
  EditOperatorModalComponent
} from "../../components/modals/edit-operator-modal/edit-operator-modal.component";

@Component({
  selector: 'app-operators-page',
  templateUrl: './operators-page.component.html',
  styleUrls: ['./operators-page.component.css']
})
export class OperatorsPageComponent implements OnInit {
  data: Operator[] = [];
  displayedColumns: string[] = ['name', 'email', 'createdAt', 'updatedAt', 'star'];
  isLoadingResults = false;

  constructor(
    private operatorsService: OperatorsService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.updateOperators();
  }

  updateOperators() {
    this.isLoadingResults = true;

    this.operatorsService.getOperators().subscribe(data => {
      this.data = data
      this.isLoadingResults = false;
    });
  }

  openEditOperatorModal(operator: Operator) {
    const dialogRef = this.dialog.open(EditOperatorModalComponent, {
      data: {
        operator,
        editMode: EDIT_MODE.EDIT,
      },
      minWidth: 500
    });

    dialogRef.componentInstance.confirm.subscribe((result) => {
      console.log(result)
      this.operatorsService.editOperator(operator.id, result).then(r => {
        dialogRef.close();
        this.updateOperators();
      }).catch((e) => {
        console.log(e)
      });
    });
  }

  openCreateOperatorModal() {
    const dialogRef = this.dialog.open(EditOperatorModalComponent, {
      data: {
        editMode: EDIT_MODE.CREATE,
      },
      minWidth: 500
    });

    dialogRef.componentInstance.confirm.subscribe((result) => {
      console.log(result)
      this.operatorsService.createOperator(result).then(r => {
        dialogRef.close();
        this.updateOperators();
      }).catch((e) => {
        console.log(e)
      });
    });
  }

  onOpenEditOperatorModal(operator: any) {
    const dialogRef = this.dialog.open(DeleteConfirmModalComponent, {
      data: {
        isRemove: false
      },
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        await this.operatorsService.delete(operator.id);
        this.updateOperators();
      }
    });
  }
}
