import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Service } from "../services.service";

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent {
  @Input() data: Service[] = [];

  @Output() edit = new EventEmitter<Service>();
  @Output() delete = new EventEmitter<Service>();

  displayedColumns: string[] = ['name', 'description', 'createdAt', 'updatedAt', 'star'];
}
