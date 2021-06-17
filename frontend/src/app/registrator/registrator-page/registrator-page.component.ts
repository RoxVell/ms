import { Component, OnInit } from '@angular/core';
import { ServiceTreeItem, ServiceTreeService, TreeItem } from "../../components/service-tree/service-tree.service";
import { Service, ServicesService } from "../../services/services.service";
import { RegistratorService, Ticket } from "../registrator.service";

@Component({
  selector: 'app-registrator-page',
  templateUrl: './registrator-page.component.html',
  styleUrls: ['./registrator-page.component.css']
})
export class RegistratorPageComponent implements OnInit {
  isTicketPickedUp = false;
  path: TreeItem[] = [];

  services: Service[] = [];
  servicesDict: { [key: number]: Service } | null = null;
  treeItems: ServiceTreeItem[] = [];
  tree: TreeItem[] = [];
  pickedTicket: Ticket | null = null
  currentServiceId: number | null = null;

  constructor(
    private serviceTreeService: ServiceTreeService,
    private servicesService: ServicesService,
    private registratorService: RegistratorService,
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
      this.takeTicket(item);
    }
  }

  takeTicket(item: TreeItem) {
    this.registratorService.takeTicket({ serviceTreeId: item.id })
      .subscribe((response) => {
        this.isTicketPickedUp = true;
        this.pickedTicket = response;
        this.currentServiceId = item.service_id;

        setTimeout(() => {
          this.isTicketPickedUp = false;
          this.pickedTicket = null;
          this.currentServiceId = null;
          this.path = [];
        }, 10000);
      });
  }

  openFolder(service: TreeItem) {
    this.path.push(service);
  }

  backFolder() {
    this.path.pop();
  }
}
