using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._3___ServicesInterfaces;
using MovtechForms.Application.Services;
using MovtechForms.Domain.Entities;

namespace MovtechForms.Application.Controllers.CoreControllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class FormGroupController : ControllerBase
    {
        private readonly IFormGroupService _formGroupRepo;
        private readonly TokenService _tokenService;

        public FormGroupController(IFormGroupService formGroupRepo, TokenService token)
        {
            _formGroupRepo = formGroupRepo;
            _tokenService = token;
        }


        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return StatusCode(200, await _formGroupRepo.Get());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when querying data: {ex.Message}");
            }
        }


        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                return Ok(await _formGroupRepo.GetById(id));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when querying data: {ex.Message}");
            }
        }


        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] FormsGroup formGroup)
        {
            try
            {
                return StatusCode(201, await _formGroupRepo.Post(formGroup));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when creating group: {ex.Message}");
            }
        }


        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _formGroupRepo.Delete(id);

                return StatusCode(200, "Successfully deleted object");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when deleting object: {ex.Message}");
            }
        }


        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] FormsGroup formGroup, int id)
        {
            try
            {
                return Ok(await _formGroupRepo.Update(formGroup, id));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when updating object: {ex.Message}");
            }
        }

    }
}
