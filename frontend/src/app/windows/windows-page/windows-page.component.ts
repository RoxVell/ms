import { Component, OnInit } from '@angular/core';
import { WindowsService, Window } from "../windows.service";
import { MatDialog } from "@angular/material/dialog";
import { DeleteConfirmModalComponent } from "../../components/modals/delete-confirm-modal/delete-confirm-modal.component";
import { EditWindowModalComponent } from "../../components/modals/edit-window-modal/edit-window-modal.component";
import { EDIT_MODE } from "../../components/modals/edit-operator-modal/edit-operator-modal.component";

interface WindowExtended extends Window {
  countServices: number;
  countOperators: number;
}

@Component({
  selector: 'app-windows-page',
  templateUrl: './windows-page.component.html',
  styleUrls: ['./windows-page.component.css']
})
export class WindowsPageComponent implements OnInit {
  data: WindowExtended[] = [];
  displayedColumns: string[] = ['name', 'type', 'countServices', 'countOperators',  'createdAt', 'updatedAt', 'star'];
  isLoadingResults = false;

  constructor(private windowsService: WindowsService, public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.updateWindows();
  }

  private updateWindows() {
    this.isLoadingResults = true;

    this.windowsService.getAll().subscribe(data => {
      console.log(data)
      this.data = data.map((window) => ({
        ...window,
        countOperators: window.operatorIds.length,
        countServices: window.serviceIds.length,
      }));
      this.isLoadingResults = false;
    });
  }

  onOpenDeleteWindowModal(window: Window) {
    const dialogRef = this.dialog.open(DeleteConfirmModalComponent);

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        await this.windowsService.delete(window.id).toPromise();
        this.updateWindows();
      }
    });
  }

  openCreateWindowModal() {
    const dialogRef = this.dialog.open(EditWindowModalComponent, {
      data: {
        editMode: EDIT_MODE.CREATE,
      },
    });

    dialogRef.componentInstance.confirm.subscribe(async (data) => {
      await this.windowsService.create(data).toPromise();
      this.updateWindows();
      dialogRef.close();
    });
  }

  openEditWindowModal(window: Window) {
    const dialogRef = this.dialog.open(EditWindowModalComponent, {
      data: {
        window,
        editMode: EDIT_MODE.EDIT,
      },
    });

    dialogRef.componentInstance.confirm.subscribe(async (data) => {
      await this.windowsService.edit(window.id, data).toPromise();
      this.updateWindows();
      dialogRef.close();
    });
  }
}
