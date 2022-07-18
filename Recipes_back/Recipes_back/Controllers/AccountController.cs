using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using Recipes_back.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
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
        private readonly IConfiguration configuration;

        public AccountController(ILogger<AccountController> logger, UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, IConfiguration config)
        {
            _logger = logger;
            _userManager = userManager; 
            _signInManager = signInManager; 
            configuration = config;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Index()
        {
            return Ok("This page is for logging in");
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("Login")]
        public async Task<IActionResult> Login(UserRegistrationModel model)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if(!string.IsNullOrEmpty(model.userName) && !string.IsNullOrEmpty(model.password))
            {
                var result = await _signInManager.PasswordSignInAsync(model.userName, model.password, false, false);
                if (result.Succeeded)
                {
                    var token = CreateToken(model.userName);
                    return Ok(new AuthResponse { Token = token });
                }
            }

            return Ok("invalid login credentials");
        }


        [HttpPost]
        [AllowAnonymous]
        [Route("Register")]
        public async Task<IActionResult> Register(UserRegistrationModel model)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //todo: check registering code. 
            if(!string.IsNullOrEmpty(model.userName) && !string.IsNullOrEmpty(model.password))
            {
                var user = new IdentityUser
                {
                    UserName = model.userName
                };

                var result = await _userManager.CreateAsync(user, model.password);

                if(result.Succeeded)
                {
                    await _signInManager.SignInAsync(user, isPersistent: false);
                    var token = CreateToken(model.userName);
                    return RedirectToAction("Index", "Recipe", new AuthResponse { Token = token });
                }
            }
            
            return Ok("invalid credentials");
        }

        public string CreateToken(string name)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(configuration.GetSection("Secret").Value);
          
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, name)
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Audience = configuration["JwtIssuer"],
                Issuer = configuration["JwtIssuer"]
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            return tokenString;
        }

    }
}