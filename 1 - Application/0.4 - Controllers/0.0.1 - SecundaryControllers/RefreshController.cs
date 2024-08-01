using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovtechForms._2___Domain._0._3___Models;
using MovtechForms.Domain.Interfaces.ServicesInterfaces;

namespace MovtechForms._1___Application._0._4___Controllers._0._0._1___SecundaryControllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class RefreshController : ControllerBase
    {
        private readonly IHttpContextAccessor _context;
        private readonly IUserService _userService;

        public RefreshController(IHttpContextAccessor context, IUserService userService)
        {
            _context = context;
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> Refresh([FromBody] RefreshTokenRequest refresh)
        {
            try
            {
                (string, DateTime) tokenRefresh = await _userService.GetUserByRefreshToken(refresh.RefreshToken);

                Console.WriteLine($"RefreshToken recebido: {refresh.RefreshToken}");
                return StatusCode(200, new
                {
                    StringToken = tokenRefresh.Item1,
                    DateToken = tokenRefresh.Item2

                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
