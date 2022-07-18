import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IRecipe } from 'src/app/models/irecipe';
import { Recipe } from 'src/app/models/recipe';

@Component({
  selector: 'app-recipe-preview',
  templateUrl: './recipe-preview.component.html',
  styleUrls: ['./recipe-preview.component.css']
})
export class RecipePreviewComponent implements OnInit {

  @Input() Recipe : IRecipe = new Recipe;
  Tags : string[] = [];
  ImgPath: any;

  constructor(private sanitizer: DomSanitizer) {
  //  this.Recipe = new Recipe;
   }

  ngOnInit(): void {
    this.mapTags();
    if(this.Recipe.Image){
      this.ImgPath =  this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
      + this.Recipe.Image) ;
    }
    else {
      this.ImgPath = '';
    }
    
   // console.log(this.Recipe);
   
  }

  mapTags() {
    if(this.Recipe.Tags){
    this.Recipe.Tags.split(',').forEach(element => {
      this.Tags.push(element);
    });
  }
}

}
