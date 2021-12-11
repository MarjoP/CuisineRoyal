using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Recipes_back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly ILogger<AccountController> _logger;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;

        public AccountController(ILogger<AccountController> logger, UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _logger = logger;
            _userManager = userManager; 
            _signInManager = signInManager; 
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Login()
        {
            return Ok("This is for logging in");
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login(string userName, string pw)
        {
            if(!string.IsNullOrEmpty(userName) && !string.IsNullOrEmpty(pw))
            {
                var result = await _signInManager.PasswordSignInAsync(userName, pw, false, false);
                if (result.Succeeded)
                {
                    return RedirectToAction("Index", "Recipe");
                }
            }

            return Ok("invalid login credentials");
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Register(string userName, string pw)
        {
            if(!string.IsNullOrEmpty(userName) && !string.IsNullOrEmpty(pw))
            {
                var user = new IdentityUser
                {
                    UserName = userName
                };

                var result = await _userManager.CreateAsync(user, pw);

                if(result.Succeeded)
                {
                    await _signInManager.SignInAsync(user, isPersistent: false);
                    return RedirectToAction("Index", "Recipe");
                }

            }
            return Ok("invalid credentials");
        }
      
    }
}