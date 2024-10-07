import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent {
  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();

  onSearchInput(event: any): void {
    const value: string = event.target.value;

    this.searchEvent.emit(value);
  }
}
