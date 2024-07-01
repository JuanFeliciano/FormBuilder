using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data;

namespace MovtechForms.Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GroupFormController : ControllerBase
    {
        private readonly IServices<FormsGroup> _formGroupService;


        public GroupFormController(IDatabaseService dbService, IServices<FormsGroup> formGroupService) => _formGroupService = formGroupService;


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                DataTable data = await _formGroupService.Get();
                string item = ConvertFormat.ConvertDataTableToJson(data);

                if (item is "[]")
                {
                    return NotFound("There are no form groups");
                }

                return Ok(item);
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
                DataTable data = await _formGroupService.Post(formGroup);
                string item = ConvertFormat.ConvertDataTableToJson(data);

                return StatusCode(201,item);
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
                DataTable data = await _formGroupService.Delete(id);
                string item = ConvertFormat.ConvertDataTableToJson(data);

                if (item is "[]")
                {
                    return NotFound("Object doesn't exist");
                }

                return Ok($"Successfully deleted object\n {item}");

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
                DataTable data = await _formGroupService.Update(formGroup, id);
                string item = ConvertFormat.ConvertDataTableToJson(data);

                if (item is "[]")
                {
                    return NotFound("Object doesn't exist");
                }

                return Ok(item);

            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Error when updating object: {ex.Message}");
            }
        }

    }
}
