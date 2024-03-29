import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewRecipeFormComponent } from './components/add-new-recipe-form/add-new-recipe-form.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'add', component: AddNewRecipeFormComponent, canActivate:[AuthGuard]},
  {path: 'edit/:id', component: EditRecipeComponent, canActivate:[AuthGuard]},
  {path: 'list', component: RecipeListComponent},
  {path: 'recipe/:id', component: RecipeComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
