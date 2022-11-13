import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { IRecipe } from 'src/app/models/irecipe';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  recipeToEdit : Recipe = new Recipe();
  recipeForm : FormGroup = new FormGroup({});

  base64textString = "";

  TagList: string[] = ["liha", "kala", "kana", "kasvis", "pääruoka", "alkupala", "jälkiruoka"];

  SelectedTags: string[] = [];
  updatedRecipe: Recipe = new Recipe();
  
  constructor(
    private formBuilder: FormBuilder,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.recipeToEdit = JSON.parse(params['recipeToEdit']) as Recipe;
      console.log(this.recipeToEdit);
  });

    this.recipeForm = this.formBuilder.group({
      Name: this.recipeToEdit.Name,
      Image: this.recipeToEdit.Image,
      Description: this.recipeToEdit.Description,
      PreparationTimeInMinutes: this.recipeToEdit.PreparationTimeInMinutes,
      Instructions: this.recipeToEdit.Instructions,
      Ingredients: this.recipeToEdit.Ingredients,
      Tags: this.recipeToEdit.Tags
    }); 

    this.SelectedTags = this.recipeToEdit.Tags.split(',').filter(e => String(e).trim());;
    console.log(this.SelectedTags);


  }

  onSubmit() {
    this.recipeForm.patchValue({Tags : this.SelectedTags});
    console.log(this.recipeForm.controls['Tags']);
    this.mapRecipe();
    this.recipeService.updateRecipe(this.updatedRecipe, this.updatedRecipe.Id)
    .subscribe({
      next: (() => {

        this.recipeForm.reset();
        this.router.navigate(['/']);
    }),
      error: (e) => {
        console.log(e);
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
    this.updatedRecipe.Name = this.recipeForm.controls["Name"].value;
    this.updatedRecipe.Image = this.base64textString;
    this.updatedRecipe.Description = this.recipeForm.controls["Description"].value;
    this.updatedRecipe.PreparationTimeInMinutes = this.recipeForm.controls["PreparationTimeInMinutes"].value;
    this.updatedRecipe.Instructions = this.recipeForm.controls["Instructions"].value;
    this.updatedRecipe.Ingredients = this.recipeForm.controls["Ingredients"].value;
    this.updatedRecipe.Id = this.recipeToEdit.Id;
    this.updatedRecipe.Tags = this.recipeForm.controls["Tags"].value.join(",");
  }

}
