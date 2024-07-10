using Microsoft.AspNetCore.Mvc;
using MovtechForms.Application.Services;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Models;

namespace MovtechForms.Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly TokenService _tokenService;

        public LoginController(TokenService tkService) => _tokenService = tkService;

        [HttpPost]
        public IActionResult Login([FromBody] LoginModel login)
        {
            if (login.Username == "admin" && login.Password == "password")
            {
                var user = new Users { Name = login.Username, Role = "Admin" };
                var token = _tokenService.GenerateToken(user);

                return Ok(token);
            }
            else if (login.Username == "user" && login.Password == "password")
            {
                var user = new Users { Name = login.Username, Role = "User" };
                var token = _tokenService.GenerateToken(user);

                return Ok(token);
            }

            return Unauthorized();
        }
    }
}
