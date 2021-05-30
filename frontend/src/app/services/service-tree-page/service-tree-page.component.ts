import { Component, ViewChild } from '@angular/core';
import { ServicesService } from "../services.service";
import { ServiceTreeService, TreeItem } from "../../components/service-tree/service-tree.service";
import { BehaviorSubject, combineLatest, forkJoin, merge, ReplaySubject, Subject } from "rxjs";
import {  map, switchMap, tap } from "rxjs/operators";
import { MatTree, MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material/tree";
import { FlatTreeControl } from "@angular/cdk/tree";
import { ServicesSelectModalComponent } from "../../components/modals/services-select-modal/services-select-modal.component";
import { MatDialog } from "@angular/material/dialog";

/** Flat node with expandable and level information */
interface FlatNode {
  expandable: boolean;
  id: number;
  service_id: number;
  level: number;
}

@Component({
  selector: 'app-service-tree-page',
  templateUrl: './service-tree-page.component.html',
  styleUrls: ['./service-tree-page.component.css']
})
export class ServiceTreePageComponent {
  @ViewChild('tree') treeElement: any;

  updateTrigger$ = new BehaviorSubject(1);
  services$ = merge(this.updateTrigger$).pipe(switchMap(() => this.servicesService.getServices()));
  servicesDict$ = this.services$.pipe(map((services) => this.servicesService.buildDictByServices(services)));
  treeItems = this.serviceTreeService.getTreeItems();
  tree = combineLatest(this.treeItems, this.services$).pipe(
    map(([treeItems, services]) => this.serviceTreeService.buildTree(treeItems, services)),
  );

  private _transformer = (node: TreeItem, level: number) => {
    console.log(node, level)
    return {
      expandable: !!node.items && node.items.length > 0,
      id: node.id,
      service_id: node.service_id,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level, node => node.expandable);

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
    this.tree.subscribe((tree) => {
      this.dataSource.data = tree;
    });
  }

  ngAfterViewInit() {
    console.log(this.treeElement)
    // this.treeElement.treeModel.expandAll();
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  addNewItem(node: any) {
    console.log('addNewItem', node)
    const dialogRef = this.dialog.open(ServicesSelectModalComponent, {
      data: {
        services: this.services$
      },
      minWidth: 500
    });

    dialogRef.componentInstance.save.subscribe((serviceIds) => {
      console.log('add new items', serviceIds);
      const job = serviceIds.map((serviceId) => this.serviceTreeService.addNewItem(node.id, serviceId));

      forkJoin(job).subscribe(() => {
        console.log('Done')
        this.updateTrigger$.next(2);
      })
    });
  }

  deleteItem(node: any) {
    console.log('deleteItem')
  }
}
