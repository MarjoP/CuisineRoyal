import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { map, Observable } from 'rxjs';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  url : string = "http://localhost:3000/Recipes/";

  constructor(private http:HttpClient) { }

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.url);
  }

  addNewRecipe(newRecipe: Recipe): Observable<any> {
    const headers = {'content-type': 'application/json'}
    const body = JSON.stringify(newRecipe);
    console.log("adding new recipe");
    return this.http.post(this.url, body, {'headers': headers})
  }

  getRecipe(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(this.url+"/"+id);
  }
}
