import { Component, OnInit } from '@angular/core';
import { data } from 'src/app/data/events';

export class Event {
  id: number;
  labels: string[];
  criticality: string;
  timestamp: string;
  eventBody: {
      symbol: string;
      codigoOperacion?: string;
  };
  status: string;
  checked: string;
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events: Event[] = data.events;
  constructor() { }

  ngOnInit(): void {
  }

}
