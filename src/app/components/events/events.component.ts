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
  filter = '';

  seen = 0;
  notSeen = 0;

  // pagination vars
  page = 0;
  limit = 10;
  length = this.events.length;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor() {
    this.updateStatistics();
  }

  get data(): Event[] {
    const firstData = this.page * this.limit;
    const dataWithFilter = this.events.filter((x) => this.filterData(x));
    this.length = dataWithFilter.length;
    return dataWithFilter.slice(firstData, (firstData + this.limit));
  }

  paginate(pageEvent: PageEvent): void {
    this.page = pageEvent.pageIndex;
    this.limit = pageEvent.pageSize;
  }

  filterData(value: Event): boolean {
    const keys = this.filter.trim().toLowerCase().split(' ');
    if (!keys.length) { return true; }
    let found;
    keys.some(key => {
      found = false;
      if (
        value.labels.join(' ').toLowerCase().indexOf(key) !== -1 ||
        value.eventBody.symbol.toLowerCase().indexOf(key) !== -1 ||
        (value.eventBody.codigoOperacion && value.eventBody.codigoOperacion.toLowerCase().indexOf(key) !== -1) ||
        value.timestamp.toLowerCase().indexOf(key) !== -1 ||
        value.status.toLowerCase().indexOf(key) !== -1 ||
        value.checked.toLowerCase().indexOf(key) !== -1
      ) { found = true; }
      if (!found) { return true; }
    });
    return found;
  }

  updateStatistics(): void {
    this.seen = this.events.filter(x => x.checked === 'visto').length;
    this.notSeen = this.events.length - this.seen;
  }

}
