import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewRecipeFormComponent } from './components/add-new-recipe-form/add-new-recipe-form.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeComponent } from './components/recipe/recipe.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'add', component: AddNewRecipeFormComponent},
  {path: 'list', component: RecipeListComponent},
  {path: 'recipe/:id', component: RecipeComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
