import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
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
    Image: '',
    Description: '',
    PreparationTimeInMinutes: 0,
    Instructions: '',
    Ingredients: '',
    Tags: ''
  });

  TagList: any[] = [
    {name:'liha', value:'liha'},
    {name:'kala', value:'kala'},
    {name: 'kasvis', value: 'kasvis'},
    {name: 'pääruoka', value: 'pääruoka'},
    {name: 'alkuruoka', value: 'alkuruoka'},
    {name: 'jälkiruoka', value: 'jälkiruoka'}
    ]
 
    SelectedTags: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.recipeForm.patchValue({Tags : this.SelectedTags});
    this.mapRecipe();
    this.recipeService.addNewRecipe(this.newRecipe)
    .subscribe(data => {
      console.log(data);
      console.log('form submitted', this.newRecipe);
      this.recipeForm.reset();
    });
    
  
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
    this.newRecipe.Image = this.recipeForm.controls["Image"].value;
    this.newRecipe.Description = this.recipeForm.controls["Description"].value;
    this.newRecipe.PreparationTimeInMinutes = this.recipeForm.controls["PreparationTimeInMinutes"].value;
    this.newRecipe.Instructions = this.recipeForm.controls["Instructions"].value;
    this.newRecipe.Ingredients = this.recipeForm.controls["Ingredients"].value;
    this.newRecipe.Tags = this.recipeForm.controls["Tags"].value;

  }
}
