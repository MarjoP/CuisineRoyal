import { IRecipe } from "./irecipe";

export class Recipe implements IRecipe {
    Name = "";
    Image? = "";
    Description = "";
    PreparationTimeInMinutes = 0;
    Instructions = "";
    Ingredients = "";
    Tags = "";
    DateAdded: Date = new Date();
    Id? = undefined;
}