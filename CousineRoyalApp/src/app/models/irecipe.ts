
export interface IRecipe {
    Name: string;
    Image: string;
    Description: string;
    PreparationTimeInMinutes: number;
    Instructions: string;
    Ingredients: string;
    Tags: string[];
    DateAdded: Date;
    id?: number;
}