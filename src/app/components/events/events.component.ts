import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
export class EventsComponent {

  events: Event[] = data.events;

  // pagination vars
  page = 0;
  limit = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  get data(): Event[] {
    const firstData = this.page * this.limit;
    return this.events.slice(firstData, (firstData + this.limit));
  }

  paginate(pageEvent: PageEvent): void {
    this.page = pageEvent.pageIndex;
    this.limit = pageEvent.pageSize;
  }

}
