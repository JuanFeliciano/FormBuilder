using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces.ServicesInterfaces;

namespace MovtechForms.Application.Controllers.CoreControllers
{
    [ApiController]
    [Route("[controller]")]
    public class FormController : ControllerBase
    {
        private readonly IServices<Forms> _formService;

        public FormController(IServices<Forms> formService) => _formService = formService;


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
        public async Task<IActionResult> Post([FromBody] Forms forms)
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
        public async Task<IActionResult> Put([FromBody] Forms forms, int id)
        {
            try
            {
                return StatusCode(201, await _formService.Update(forms, id));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when updating data: {ex.Message}");
            }
        }
    }
}
