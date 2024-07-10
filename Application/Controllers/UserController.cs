using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;

namespace MovtechForms.Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService uService) => _userService = uService;

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] Users users)
        {
            try
            {
                Users user = await _userService.CreateUser(users);

                return Ok(user);
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Error when creating object: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> GetByUsername([FromBody] Users users)
        {
            try
            {
                List<Users> listUsers = await _userService.GetByUsername(users);

                return Ok(listUsers);
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Error when searching object: {ex.Message}");
            }
        }
    }
}
