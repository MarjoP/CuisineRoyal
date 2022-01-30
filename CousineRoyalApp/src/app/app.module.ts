import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddNewRecipeFormComponent } from './components/add-new-recipe-form/add-new-recipe-form.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RecipePreviewComponent } from './components/recipe-preview/recipe-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    AddNewRecipeFormComponent,
    RecipeComponent,
    RecipeListComponent,
    RecipePreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
