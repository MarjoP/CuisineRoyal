using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Recipes_back.Interfaces;
using Recipes_back.Models;
using Recipes_back.Repo;
using System;
using System.Threading.Tasks;


namespace Recipes_back.Controllers
{
    [ApiController]
    [Route("api/")]
    public class RecipeController : Controller
    {
        private readonly IRecipeRepository recipeRepository;
        public RecipeController(IRecipeRepository repo)
        {
            recipeRepository = repo;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Index()
        {
            var recipes = await recipeRepository.GetRecipesAsync();
            if(recipes == null)
            {
                return Ok("no recipes found");
            }
            return Ok(recipes);
        }

     

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AddNew(Recipe recipe)
        {
            var newRecipe = new Recipe();
            newRecipe.Name = recipe.Name;
            newRecipe.Description = recipe.Description;
            newRecipe.Image = recipe.Image;
            newRecipe.PreparationTimeInMinutes = recipe.PreparationTimeInMinutes;
            newRecipe.Instructions = recipe.Instructions;
            newRecipe.Ingredients = recipe.Ingredients;
            newRecipe.Tags = recipe.Tags;
            newRecipe.DateAdded = DateTime.Today;

            try
            {
                recipeRepository.AddRecipe(newRecipe);
            }
            catch (Exception ex)
            {
                return BadRequest("Something went wrong, not able to save the recipe");  
            }

            return Ok($"new recipe '{recipe.Name}' added");
        }

    }
}
