import { Component, Input, OnInit } from '@angular/core';
import { ServiceTreeItem } from "../../components/service-tree/service-tree.service";

@Component({
  selector: 'app-registrator-item',
  templateUrl: './registrator-item.component.html',
  styleUrls: ['./registrator-item.component.css']
})
export class RegistratorItemComponent implements OnInit {
  // @Input() item!: ServiceTreeItem;
  @Input() isGroup!: boolean;
  @Input() title!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
