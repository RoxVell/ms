import { Component, OnInit } from '@angular/core';
import { Service, ServicesService } from "../services.service";
import { MatDialog } from "@angular/material/dialog";
import {
  EDIT_MODE,
  EditServiceModalComponent
} from "../../components/modals/edit-service-modal/edit-service-modal.component";
import { DeleteConfirmModalComponent } from "../../components/modals/delete-confirm-modal/delete-confirm-modal.component";

@Component({
  selector: 'app-service-groups-page',
  templateUrl: './service-groups-page.component.html',
  styleUrls: ['./service-groups-page.component.css']
})
export class ServiceGroupsPageComponent implements OnInit {
  data: Service[] = [];
  isLoadingResults = false;

  constructor(
    private servicesService: ServicesService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.updateServices()
  }

  updateServices() {
    this.isLoadingResults = true;

    this.servicesService.getServices(true)
      .subscribe((services) => {
        this.data = services;
        this.isLoadingResults = false;
      });
  }

  openCreateServiceModal() {
    const dialogRef = this.dialog.open(EditServiceModalComponent, {
      data: {
        editMode: EDIT_MODE.EDIT,
        isGroup: true
      },
      minWidth: 500
    });

    dialogRef.componentInstance.confirm.subscribe((result) => {
      console.log(result)
      this.servicesService.create(result)
        .subscribe({
          next: (result) => {
            this.updateServices();
            dialogRef.close();
          },
          error(error) {
            console.log(error)
          }
        });
    });
  }

  openEditServiceModal(service: Service) {
    const dialogRef = this.dialog.open(EditServiceModalComponent, {
      data: {
        service,
        editMode: EDIT_MODE.EDIT,
        isGroup: true,
      },
      minWidth: 500
    });

    dialogRef.componentInstance.confirm.subscribe((result) => {
      this.servicesService.edit(service.id, result)
        .subscribe({
          next: (result) => {
            console.log(result)
            dialogRef.close();
            this.updateServices();
          },
          error(error) {
            console.log(error)
          }
        })
    });
  }

  onOpenDeleteServiceModal(service: Service) {
    const dialogRef = this.dialog.open(DeleteConfirmModalComponent, {
      data: {
        isRemove: false
      },
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        await this.servicesService.deleteService(service.id);
        this.updateServices();
      }
    });
  }
}
