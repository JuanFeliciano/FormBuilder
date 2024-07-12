using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data;

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
                return Ok(await _userService.CreateUser(users));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when creating object: {ex.Message}");
            }
        }


        [HttpGet]
        public async Task<IActionResult> GetByUsername()
        {
            try
            {
                return Ok(await _userService.GetUser());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when searching object: {ex.Message}");
            }
        }
    }
}
