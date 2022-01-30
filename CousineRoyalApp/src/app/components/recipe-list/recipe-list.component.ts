import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/models/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  Recipes = Array<Recipe>();
  Recipe = new Recipe();
  constructor(private RecipeService: RecipeService) { }

  ngOnInit(): void {

    this.RecipeService.getAllRecipes().subscribe(
      data => {
        console.log(data);
        this.Recipes = data
        this.Recipe = data[2];
        console.log(this.Recipe);
      }
    )
    
   
  }

}
