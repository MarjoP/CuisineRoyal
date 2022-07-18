using System.ComponentModel.DataAnnotations;

namespace Recipes_back.Models
{
    public class UserRegistrationModel
    {
        [Required]
        public string userName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string password { get; set; }
    }
}
