using Microsoft.EntityFrameworkCore;
using Recipes_back.Data;
using Recipes_back.Interfaces;
using Recipes_back.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Recipes_back.Repo
{
    public class RecipeRepository : IRecipeRepository
    {
        private readonly AppDbContext dbcontext;

        public RecipeRepository(AppDbContext context)
        {
            dbcontext = context; 
        }

        public void AddRecipe(Recipe recipe)
        {
            dbcontext.Recipes.Add(recipe);
        }

        public void DeleteRecipe(Recipe recipe)
        {
            throw new System.NotImplementedException();
        }

        public async Task<IEnumerable<Recipe>> GetRecipesAsync()
        {
            return await dbcontext.Recipes.ToListAsync();
        }

        public Task<Recipe> UpdateRecipe(Recipe recipe)
        {
            throw new System.NotImplementedException();
        }
    }
}
