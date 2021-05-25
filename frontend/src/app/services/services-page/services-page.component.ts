import { Component, OnInit } from '@angular/core';
import { Service, ServicesService } from "../services.service";
import { EditServiceModalComponent, EDIT_MODE } from "../../components/modals/edit-service-modal/edit-service-modal.component";
import { MatDialog } from "@angular/material/dialog";
import { Operator } from "../../operators/operators.service";
import { DeleteConfirmModalComponent } from "../../components/modals/delete-confirm-modal/delete-confirm-modal.component";
import { BehaviorSubject, merge, ReplaySubject } from "rxjs";

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.css']
})
export class ServicesPageComponent implements OnInit {
  data: Service[] = [];
  displayedColumns: string[] = ['name', 'description', 'createdAt', 'updatedAt', 'star'];
  isLoadingResults = false;
  isGroup$ = new BehaviorSubject(false);

  constructor(
    private servicesService: ServicesService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    // this.updateServices();
    merge(this.isGroup$).subscribe(() => this.updateServices());
  }

  updateServices() {
    this.isLoadingResults = true;

    this.servicesService.getServices(Boolean(this.isGroup$.value))
      .subscribe((services) => {
        this.data = services;
        this.isLoadingResults = false;
      });
  }

  openCreateServiceModal() {
    const dialogRef = this.dialog.open(EditServiceModalComponent, {
      data: {
        editMode: EDIT_MODE.EDIT,
        isGroup: this.isGroup$.value
      },
      minWidth: 500
    });

    dialogRef.componentInstance.confirm.subscribe((result) => {
      console.log(result)
      this.servicesService.create(result)
        .subscribe({
          next(result) {
            console.log(result)
            dialogRef.close();
          },
          error(error) {
            console.log(error)
          }
        })
    });
  }

  openEditServiceModal(service: Service) {
    const dialogRef = this.dialog.open(EditServiceModalComponent, {
      data: {
        service,
        editMode: EDIT_MODE.EDIT,
        isGroup: this.isGroup$.value,
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

  onTabChange($event: any) {
    console.log($event);
    this.isGroup$.next(Boolean($event));
  }
}
