import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { IRecipe } from 'src/app/models/irecipe';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Location } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
 // public RecipeId? :number = undefined;
  Recipe = new Recipe();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private RecipeService : RecipeService,
              private location : Location,
              private jwtHelper: JwtHelperService) {

   }
  
  ngOnInit(): void {

   let RecipeId = +this.route.snapshot.params['id'];
   console.log(RecipeId);
   this.RecipeService.getRecipe(RecipeId).subscribe(
     data => {
       console.log(data);
       this.Recipe=data;
     }
   )
}

goBack() {
  this.location.back();
}

loggedIn = () : boolean => {
  const token = localStorage.getItem("jwt");
  if (token && !this.jwtHelper.isTokenExpired(token)){
    return true;
  }
  return false;
}

}
