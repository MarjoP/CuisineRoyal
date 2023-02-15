using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Recipes_back.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        public string? Image { get; set; }
        public string? Description { get; set; }
        public int PreparationTimeInMinutes { get; set; }
        [Required]
        public string? Instructions { get; set; }
        [Required]
        public string? Ingredients { get; set; }
        public string? Tags { get; set; }
        public DateTime? DateAdded { get; set; }

    }
 
}
