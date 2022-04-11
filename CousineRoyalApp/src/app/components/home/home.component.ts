import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  qty: number = 5;
  TagList: string[] = ["liha", "kala", "kasvis", "pääruoka", "alkuruoka", "jälkiruoka"];
    
  constructor() { }

  ngOnInit(): void {
  }

}
