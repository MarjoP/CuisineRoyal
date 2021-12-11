using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Recipes_back.Models
{
    public class Ingredient
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Amount { get; set; }
        public string? Unit { get; set; }
    }
}
