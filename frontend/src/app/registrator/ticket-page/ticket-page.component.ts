import { Component, Input, OnInit } from '@angular/core';
import { Ticket } from "../registrator.service";
import { Service } from "../../services/services.service";

@Component({
  selector: 'app-ticket-page',
  templateUrl: './ticket-page.component.html',
  styleUrls: ['./ticket-page.component.css']
})
export class TicketPageComponent implements OnInit {
  @Input() ticket: Ticket | null = null;
  @Input() servicesDict: { [key: number]: Service } | null = null;
  @Input() serviceId: number | null = null;

  constructor() { }

  ngOnInit() {
  }

  get ticketNumber() {
    return this.ticket ? `${this.ticket.prefix}${String(this.ticket.number).padStart(3, '0')}` : '';
  }

  get ticketServiceName() {
    // @ts-ignore
    return this.ticket ? this.servicesDict[this.serviceId].name : '';
  }

  get ticketServiceDesc() {
    // @ts-ignore
    return this.ticket ? this.servicesDict[this.serviceId].description : '';
  }

}
