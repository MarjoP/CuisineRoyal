import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/models/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnChanges {

  @Input() Quantity : number;
  @Input() SelectedTags : string[];
  @Input() SearchText : string = "";
  Recipes = Array<Recipe>();

  constructor(private RecipeService: RecipeService) {
    this.Quantity = 5;
    this.SelectedTags=[];
   }

  ngOnInit(): void {
    this.RecipeService.getAllRecipes().subscribe(
      data => {
        this.Recipes = data.sort((a,b) => {
          return (new Date(b.DateAdded).getTime() - new Date(a.DateAdded).getTime());
        });
      }
    )
  }

  ngOnChanges(changes: SimpleChanges) {
}
}
