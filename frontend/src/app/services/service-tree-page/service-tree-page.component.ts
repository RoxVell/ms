import { Component, ViewChild } from '@angular/core';
import { ServicesService } from "../services.service";
import { ServiceTreeService, TreeItem } from "../../components/service-tree/service-tree.service";
import { BehaviorSubject, combineLatest, forkJoin, merge } from "rxjs";
import { filter, first, map, switchMap, tap } from "rxjs/operators";
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material/tree";
import { FlatTreeControl } from "@angular/cdk/tree";
import { ServicesSelectModalComponent } from "../../components/modals/services-select-modal/services-select-modal.component";
import { MatDialog } from "@angular/material/dialog";
import { DeleteConfirmModalComponent } from "../../components/modals/delete-confirm-modal/delete-confirm-modal.component";

/** Flat node with expandable and level information */
export interface FlatNode {
  expandable: boolean;
  id: number;
  service_id: number;
  path: string;
  level: number;
}

@Component({
  selector: 'app-service-tree-page',
  templateUrl: './service-tree-page.component.html',
  styleUrls: ['./service-tree-page.component.css']
})
export class ServiceTreePageComponent {
  @ViewChild('tree', { static: false }) treeElement: any;

  updateTrigger$ = new BehaviorSubject(1);
  services$ = this.servicesService.getServices();
  servicesDict$ = this.services$.pipe(map((services) => this.servicesService.buildDictByServices(services)));
  treeItems = merge(this.updateTrigger$).pipe(switchMap(() => this.serviceTreeService.getTreeItems()));
  tree = combineLatest(this.treeItems, this.services$).pipe(
    map(([treeItems]) => this.serviceTreeService.buildTree(treeItems)),
    tap(() => {
      setTimeout(() => this.treeElement.treeControl.expandAll());
    })
  );

  private _transformer = (node: TreeItem, level: number) => {
    return {
      expandable: !!node.items && node.items.length > 0,
      id: node.id,
      path: node.originalPath,
      service_id: node.service_id,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.items
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private servicesService: ServicesService,
    private serviceTreeService: ServiceTreeService,
    public dialog: MatDialog,
  ) {
    this.tree.subscribe((tree) => this.dataSource.data = tree);
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  addNewItem(node: FlatNode) {
    this.tree.pipe(first()).subscribe(tree => {
      const element = this.serviceTreeService.findById(tree, node.id);
      const excludeServiceIds = element?.items.map((item) => item.service_id) || [];

      const dialogRef = this.dialog.open(ServicesSelectModalComponent, {
        data: {
          services: this.services$.pipe(
            map((service) => {
              return service.filter((serviceItem) => !excludeServiceIds.includes(serviceItem.id))
            })),
        },
        minWidth: 500
      });

      dialogRef.componentInstance.save.subscribe((serviceIds) => {
        const job = serviceIds.map((serviceId) => this.serviceTreeService.addNewItem(node.id, serviceId));

        forkJoin(job).subscribe(() => {
          this.updateTrigger$.next(2);
          dialogRef.close();
        });
      });
    });
  }

  deleteItem(node: FlatNode) {
    const dialogRef = this.dialog.open(DeleteConfirmModalComponent, {
      data: {
        isRemove: false
      },
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        await this.serviceTreeService.deleteByPath(node.path).toPromise();
        this.updateTrigger$.next(2);
      }
    });
  }

  addNewRootItem() {
    this.tree.pipe(first()).subscribe(tree => {
      // const element = this.serviceTreeService.findById(tree, node.id);
      const excludeServiceIds = tree.map((item) => item.service_id) || [];

      const dialogRef = this.dialog.open(ServicesSelectModalComponent, {
        data: {
          services: this.services$.pipe(
            map((service) => {
              return service.filter((serviceItem) => !excludeServiceIds.includes(serviceItem.id))
            })),
        },
        minWidth: 500
      });

      dialogRef.componentInstance.save.subscribe((serviceIds) => {
        const job = serviceIds.map((serviceId) => this.serviceTreeService.addNewItem('', serviceId));

        forkJoin(job).subscribe(() => {
          this.updateTrigger$.next(2);
          dialogRef.close();
        });
      });
    });
  }
}
