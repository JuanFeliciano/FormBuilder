using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data;

namespace MovtechForms.Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FormController : ControllerBase
    {
        private readonly IServices<Forms> _formService;

        public FormController(IServices<Forms> formService, IDatabaseService dbService) => _formService = formService;

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                DataTable data = await _formService.Get();
                string item = ConvertFormat.ConvertDataTableToJson(data);

                if (item is "[]")
                {
                    return NotFound("There are no forms");
                }

                return Ok(item);
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
                DataTable data = await _formService.Post(forms);
                string item = ConvertFormat.ConvertDataTableToJson(data);

                return StatusCode(201, item);
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
                DataTable data = await _formService.Delete(id);
                string item = ConvertFormat.ConvertDataTableToJson(data);

                if (item is "[]")
                {
                    return NotFound("Object doesn't exist");
                }

                return Ok($"Successfully deleted object\n {item}");
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
                DataTable data = await _formService.Update(forms, id);
                string item = ConvertFormat.ConvertDataTableToJson(data);

                if (item is "[]")
                {
                    return StatusCode(404,"Error id doesn't exist");
                }

                return StatusCode(201, item);
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Error when updating data: {ex.Message}");
            }

        }
    }
}
