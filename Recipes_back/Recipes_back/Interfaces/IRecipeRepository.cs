using Recipes_back.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Recipes_back.Interfaces
{
    public interface IRecipeRepository
    {
        Task<IEnumerable<Recipe>> GetRecipesAsync();
        void AddRecipe(Recipe recipe);
        Task<Recipe> UpdateRecipe(Recipe recipe);
        void DeleteRecipe(Recipe recipe);
        Task<Recipe> GetRecipeAsync(int id);
    }
}
