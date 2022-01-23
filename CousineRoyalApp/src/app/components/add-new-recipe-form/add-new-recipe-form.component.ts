import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Recipe } from 'src/app/models/recipe';
@Component({
  selector: 'app-add-new-recipe-form',
  templateUrl: './add-new-recipe-form.component.html',
  styleUrls: ['./add-new-recipe-form.component.css']
})
export class AddNewRecipeFormComponent implements OnInit {

  //addRecipeForm : FormGroup | undefined;
  newRecipe = new Recipe();
  recipeForm: FormGroup = this.formBuilder.group({
    Name: '',
    Image: '',
    Description: '',
    PreparationTimeInMinutes: 0,
    Instructions: '',
    Ingredients: {name:'', amount: '', unit: ''},
    Tags: ''
  });
  Tags: string[] = ['liha', 'kala', 'kana', 'kasvis', 'pääruoka', 'alkuruoka', 'jälkiruoka']

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('form submitted', this.recipeForm.value);
  }
}
