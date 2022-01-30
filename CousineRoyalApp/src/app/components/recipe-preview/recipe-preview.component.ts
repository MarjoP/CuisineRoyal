import { Component, Input, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/models/irecipe';
import { Recipe } from 'src/app/models/recipe';

@Component({
  selector: 'app-recipe-preview',
  templateUrl: './recipe-preview.component.html',
  styleUrls: ['./recipe-preview.component.css']
})
export class RecipePreviewComponent implements OnInit {

  @Input() Recipe : IRecipe;
  
  constructor() {
    this.Recipe = new Recipe;
   }

  ngOnInit(): void {
  }

}
