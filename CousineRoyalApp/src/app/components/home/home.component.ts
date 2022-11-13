import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  qty: number = 5;
  TagList: string[] = ["meat", "fish", "chicken", "vegetarian", "main", "starter", "desert"];
  SelectedTags : string[]= [];  
  SearchText : string = "";

  constructor() { }

  ngOnInit(): void {

  }

  selectTag(tag:string) {
    if(!this.SelectedTags.includes(tag)){
      this.SelectedTags = [...this.SelectedTags, tag];
    }
    else {
      this.SelectedTags=this.SelectedTags.filter(item => item !== tag);
    }
  }

  setFilterText(filterText: string) {
    this.SearchText=filterText;
  }
}
