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
            return Ok(await _lgService.ValidationLogin(login));
        }
    }
}
