import { Component, OnInit } from '@angular/core';
import { ServiceTreeItem, ServiceTreeService, TreeItem } from "../../components/service-tree/service-tree.service";
import { Service, ServicesService } from "../../services/services.service";
import { first, map, switchMap, tap } from "rxjs/operators";
import { combineLatest, forkJoin, merge } from "rxjs";

@Component({
  selector: 'app-registrator-page',
  templateUrl: './registrator-page.component.html',
  styleUrls: ['./registrator-page.component.css']
})
export class RegistratorPageComponent implements OnInit {
  path: TreeItem[] = [];

  services: Service[] = [];
  servicesDict: { [key: number]: Service } | null = null;
  treeItems: ServiceTreeItem[] = [];
  tree: TreeItem[] = [];

  constructor(
    private serviceTreeService: ServiceTreeService,
    private servicesService: ServicesService,
  ) {}

  get currentGroup() {
    return this.path.length
      ? this.path[this.path.length - 1].items
      : this.tree;
  }

  get description() {
    if (!this.path.length) return '';

    // @ts-ignore
    const service = this.servicesDict[this.path[this.path.length - 1].service_id];

    return service ? service.description : '';
  }

  async ngOnInit() {
    this.services = await this.getServices();
    this.servicesDict = this.servicesService.buildDictByServices(this.services);
    this.treeItems = await this.serviceTreeService.getTreeItems().toPromise();
    this.tree = await this.serviceTreeService.buildTree(this.treeItems);
  }

  private getServices() {
    return this.servicesService.getServices().toPromise();
  }

  onItemClick(item: TreeItem) {
    console.log(item)

    // @ts-ignore
    if (this.servicesDict[item.service_id].isGroup) {
      this.openFolder(item);
    } else {

    }

  }

  openFolder(service: TreeItem) {
    this.path.push(service);
  }

  backFolder() {
    this.path.pop();
  }
}
