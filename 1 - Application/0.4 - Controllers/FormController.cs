using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._3___ServicesInterfaces;
using MovtechForms.Domain.Entities;

namespace MovtechForms.Application.Controllers.CoreControllers
{
    [ApiController]
    [Route("[controller]")]
    public class FormController : ControllerBase
    {
        private readonly IFormService _formService;

        public FormController(IFormService formService) => _formService = formService;


        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return StatusCode(200, await _formService.Get());
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
                return StatusCode(200, await _formService.GetById(id));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when querying data: {ex.Message}");
            }
        }


        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Form forms)
        {
            try
            {
                return StatusCode(201, await _formService.Post(forms));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when creating data: {ex.Message}");
            }
        }


        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _formService.Delete(id);

                return StatusCode(200, "Successfully deleted object");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when deleting data: {ex.Message}");
            }
        }


        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] Form forms, int id)
        {
            try
            {
                return StatusCode(200, await _formService.Update(forms, id));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when updating data: {ex.Message}");
            }
        }
    }
}
