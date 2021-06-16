import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-page',
  templateUrl: './ticket-page.component.html',
  styleUrls: ['./ticket-page.component.css']
})
export class TicketPageComponent implements OnInit {
  @Input() name: string = '';

  constructor() { }

  ngOnInit() {
  }

}
