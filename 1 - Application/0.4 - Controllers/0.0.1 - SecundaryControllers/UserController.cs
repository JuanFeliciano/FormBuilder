using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces.ServicesInterfaces;

namespace MovtechForms.Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService uService) => _userService = uService;


        [HttpPost]
        public async Task<IActionResult> Post([FromBody] User users)
        {
            try
            {
                return StatusCode(201, await _userService.CreateUser(users));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when creating object: {ex.Message}");
            }
        }


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return StatusCode(200, await _userService.GetUser());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when searching object: {ex.Message}");
            }
        }
    }
}
