using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Interfaces;
using MovtechForms.Domain.Models;

namespace MovtechForms.Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _lgService;

        public LoginController(ILoginService lg) => _lgService = lg;

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginModel login)
        {
            return Ok(await _lgService.ValidationLogin(login));
        }
    }
}
