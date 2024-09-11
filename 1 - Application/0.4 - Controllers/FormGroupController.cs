using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._3___ServicesInterfaces;
using MovtechForms.Domain.Entities;

namespace MovtechForms.Application.Controllers.CoreControllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class FormGroupController : ControllerBase
    {
        private readonly IFormGroupService _formGroupService;

        public FormGroupController(IFormGroupService formGroupRepo) => _formGroupService = formGroupRepo;


        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return StatusCode(200, await _formGroupService.Get());
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
                return StatusCode(200,await _formGroupService.GetById(id));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when querying data: {ex.Message}");
            }
        }


        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] FormGroup formGroup)
        {
            try
            {
                return StatusCode(201, await _formGroupService.Post(formGroup));
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
                await _formGroupService.Delete(id);

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when deleting object: {ex.Message}");
            }
        }


        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] FormGroup formGroup, int id)
        {
            try
            {
                return StatusCode(201,await _formGroupService.Update(formGroup, id));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when updating object: {ex.Message}");
            }
        }

    }
}
