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
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { FilterPipe } from './pipes/filter.pipe';
import { SearchComponent } from './components/search/search.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';


export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    AddNewRecipeFormComponent,
    RecipeComponent,
    RecipeListComponent,
    RecipePreviewComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    FilterPipe,
    SearchComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:44339"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
