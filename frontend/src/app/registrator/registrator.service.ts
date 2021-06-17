import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CreateTicketDto } from "../../../../backend/src/tickets/dto/create-ticket.dto";
import { TicketStatus } from "../../../../backend/src/tickets/consts/ticket-status";

export interface Ticket {
  id: number;
  number: number;
  prefix: string;
  serviceTreeId: number;
  status: TicketStatus,
  updatedAt: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegistratorService {
  constructor(
    private http: HttpClient,
  ) { }

  takeTicket(dto: CreateTicketDto) {
    return this.http.post<Ticket>('http://localhost:3000/tickets/', dto);
  }
}
