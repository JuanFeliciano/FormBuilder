using Microsoft.AspNetCore.Mvc;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._3___ServicesInterfaces._0._0._0._1___SecundaryInterfaces;

namespace MovtechForms._1___Application._0._4___Controllers._0._0._1___SecundaryControllers
{
    [ApiController]
    [Route("[controller]")]
    public class LogoutController : ControllerBase
    {
        private readonly ILogoutService _logout;

        public LogoutController(ILogoutService logout) => _logout = logout;

        [HttpPost]
        public IActionResult LogOut()
        {
            var context = HttpContext;

            try
            {
                _logout.Logout(context);

                return Ok(new { message = "LogOut completed" });  
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
