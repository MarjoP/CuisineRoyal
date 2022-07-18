import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() SearchText = new EventEmitter<string>();

  query: string = "";
  searchResults: number[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  filter(value: string) {
    this.SearchText.emit(value);
  }
  changeText(event: any) {
    this.filter(this.query);
  }

}
