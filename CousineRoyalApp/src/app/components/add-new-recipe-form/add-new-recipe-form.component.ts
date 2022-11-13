import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, ReplaySubject } from 'rxjs';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';



@Component({
  selector: 'app-add-new-recipe-form',
  templateUrl: './add-new-recipe-form.component.html',
  styleUrls: ['./add-new-recipe-form.component.css']
})

export class AddNewRecipeFormComponent implements OnInit {

  newRecipe = new Recipe();
  recipeForm: FormGroup = this.formBuilder.group({
    Name: '',
    Image:'',
    Description: '',
    PreparationTimeInMinutes: 0,
    Instructions: '',
    Ingredients: '',
    Tags: ''
  });

  base64textString = "";

  TagList: string[] = ["liha", "kala", "kana", "kasvis", "pääruoka", "alkupala", "jälkiruoka"];

  SelectedTags: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private recipeService: RecipeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.TagList);
  }

  onSubmit() {
    this.recipeForm.patchValue({Tags : this.SelectedTags});
    this.mapRecipe();
    this.recipeService.addNewRecipe(this.newRecipe)
    .subscribe({
      next: (() => {

        this.recipeForm.reset();
        this.router.navigate(['/']);
    }),
      error: (e) => {
      }
    });
  }

  onFileAdded(imageInput:any) {
    const file : File = imageInput.files[0];
    this.convertFile(imageInput.files[0]).subscribe(base64 => {
      this.base64textString = base64;
      console.log(base64);
    });
   
  }

  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target!.result!.toString()));
    return result;
  }


  onTagChange(tag:string, event:any) {
    console.log("tag: ", tag, " selected: ", event.target.checked);
    if(event.target.checked){
      this.SelectedTags.push(tag);
    }
    else {
      this.SelectedTags=this.SelectedTags.filter(item => item !== tag);
    }
  }

  mapRecipe(): void {
    this.newRecipe.Name = this.recipeForm.controls["Name"].value;
    this.newRecipe.Image = this.base64textString;
    this.newRecipe.Description = this.recipeForm.controls["Description"].value;
    this.newRecipe.PreparationTimeInMinutes = this.recipeForm.controls["PreparationTimeInMinutes"].value;
    this.newRecipe.Instructions = this.recipeForm.controls["Instructions"].value;
    this.newRecipe.Ingredients = this.recipeForm.controls["Ingredients"].value;
    this.newRecipe.Tags = this.recipeForm.controls["Tags"].value.join(",");

  }

}
