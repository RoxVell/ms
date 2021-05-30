import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Service } from "../../services/services.service";

export interface ServiceTreeItem {
  id: number;
  path: string;
  service_id: number;
  created_at: string;
  updated_at: string;
}

export type TreeItem = Omit<ServiceTreeItem, 'path'> & { items: TreeItem[]; path: string[]; }

@Injectable({
  providedIn: 'root'
})
export class ServiceTreeService {
  constructor(
    private http: HttpClient
  ) { }

  getTreeItems() {
    return this.http.get<ServiceTreeItem[]>('http://localhost:3000/service-tree');
  }

  addNewItem(parentId: number, serviceId: number) {
    return this.http.post('http://localhost:3000/service-tree', {
      parent_id: parentId,
      service_id: serviceId
    });
  }

  buildTree(treeItems: ServiceTreeItem[], services: Service[]) {
    console.log('buildTree')
    const tree: TreeItem[] = [];

    const filteredTreeItems: TreeItem[] = treeItems
      .map((treeItem) => ({
        ...treeItem,
        path: treeItem.path.split('/').slice(0, -2),
        items: []
      }))
      .sort((a, b) => a.path.length - b.path.length);

    for (const treeItem of filteredTreeItems) {
      if (treeItem.path.length === 0) {
        tree.push(treeItem);
      } else {
        let targetGroup: TreeItem | undefined

        for (const group of treeItem.path) {
          const placeToFind = targetGroup ? targetGroup.items : tree;

          targetGroup = placeToFind.find((treeItem) => treeItem.service_id === Number(group));

          if (!targetGroup) {
            console.log('Группа не найдена')
          }
        }

        if (targetGroup) {
          targetGroup.items.push(treeItem);
        }
      }
    }

    console.log(tree);

    return tree;
  }
}
