using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Recipes_back.Models;
using System.Threading.Tasks;


namespace Recipes_back.Controllers
{
    [ApiController]
    [Route("api/")]
    public class RecipeController : Controller
    {
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Index()
        {
            return Ok("You are at home. Here is the main page with last 5 recipes");
        }

     

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AddNew(Recipe recipe)
        {
            //try store the recipe to database
            return Ok($"new recipe '{recipe.Name}' added");
        }

    }
}
