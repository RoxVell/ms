import { Component, OnInit } from '@angular/core';
import { ServicesService } from "../services.service";

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.css']
})
export class ServicesPageComponent implements OnInit {
  constructor(
    private servicesService: ServicesService,
  ) { }

  ngOnInit(): void {
  }

  openCreateServiceModal() {

  }
}
