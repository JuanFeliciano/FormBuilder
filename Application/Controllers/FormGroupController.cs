using Microsoft.AspNetCore.Mvc;
using MovtechForms.Application.Services;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;

namespace MovtechForms.Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FormGroupController : ControllerBase
    {
        private readonly IServices<FormsGroup> _formGroupRepo;

        public FormGroupController(IServices<FormsGroup> formGroupRepo) => _formGroupRepo = formGroupRepo;


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                string data = await _formGroupRepo.Get();

                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when querying data: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] FormsGroup formGroup)
        {
            try
            {
                string data = await _formGroupRepo.Post(formGroup);

                return StatusCode(201,data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when creating group: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                string data = await _formGroupRepo.Delete(id);

                return Ok($"Successfully deleted object\n {data}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when deleting object: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] FormsGroup formGroup, int id)
        {
            try
            {
                string data = await _formGroupRepo.Update(formGroup, id);

                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when updating object: {ex.Message}");
            }
        }

    }
}
