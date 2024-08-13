using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Interfaces.ServicesInterfaces;
using MovtechForms.Domain.Models;

namespace MovtechForms.Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _lgService;

        public LoginController(ILoginService login) => _lgService = login;

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginModel login)
        {
            try
            {
                (string, string, string) tokens = await _lgService.ValidationLogin(login);

                return StatusCode(201, new {
                    AccessToken = tokens.Item1,
                    RefreshToken = tokens.Item2,
                    Role = tokens.Item3
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
