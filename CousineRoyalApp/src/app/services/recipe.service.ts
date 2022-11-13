import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { map, Observable } from 'rxjs';
import { Recipe } from '../models/recipe';
import { IRecipe } from '../models/irecipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  url : string = "https://localhost:44339/api/recipe";

  constructor(private http:HttpClient) { }

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.url);
  }

  addNewRecipe(newRecipe: Recipe): Observable<any> {
   
    const headers = {'content-type': 'application/json', responseType:'text'}
    const body = JSON.stringify(newRecipe);
    
    return this.http.post(this.url, body , {'headers': headers})
  }

  getRecipe(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(this.url+"/"+id);
  }

  updateRecipe(updatedRecipe: IRecipe, id: any) :Observable<any> {
    const headers = {'content-type': 'application/json', responseType:'text'}
    const body = JSON.stringify(updatedRecipe);

    return this.http.put(this.url+"/update/"+id, body , {'headers': headers})
  }
}
