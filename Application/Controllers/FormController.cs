using Microsoft.AspNetCore.Mvc;
using MovtechForms.Application.Services;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;

namespace MovtechForms.Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FormController : ControllerBase
    {
        private readonly IServices<Forms> _formService;

        public FormController(IServices<Forms> formService) => _formService = formService;

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                string data = await _formService.Get();

                return StatusCode(200, data);
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Error when querying data: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Forms forms)
        {
            try
            {
                string data = await _formService.Post(forms);

                return StatusCode(201, data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when creating data: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                string data = await _formService.Delete(id);

                return Ok($"Successfully deleted object\n {data}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when deleting data: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] Forms forms, int id)
        {
            try
            {
                string data = await _formService.Update(forms, id);

                return StatusCode(201, data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when updating data: {ex.Message}");
            }
        }
    }
}
