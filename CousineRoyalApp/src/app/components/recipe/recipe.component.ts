import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { IRecipe } from 'src/app/models/irecipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  @Input() Recipe : IRecipe;
  constructor() {

    this.Recipe = new Recipe;
   }
  
  ngOnInit(): void {
   

}

}
