using Microsoft.AspNetCore.Mvc;
using MovtechForms.Application.Services.GroupFormService;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data;

namespace MovtechForms.Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GroupFormController : ControllerBase
    {
        private readonly IDatabaseService _dbService;
        private readonly IFormGroupService _formGroupService;


        public GroupFormController(IDatabaseService dbService, IFormGroupService formGroupService)
        {
            _dbService = dbService ?? throw new ArgumentNullException(nameof(dbService));
            _formGroupService = formGroupService;
        }


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                DataTable data = await _formGroupService.GetFormGroup();
                string item = ConvertFormat.ConvertDataTableToJson(data);

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
                DataTable data = await _formGroupService.PostFormGroup(formGroup);
                string item = ConvertFormat.ConvertDataTableToJson(data);

                return Ok(item);
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
                DataTable data = await _formGroupService.DeleteFormGroup(id);
                string item = ConvertFormat.ConvertDataTableToJson(data);

                return Ok("Successfully deleted object");

            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Error when deleting object: {ex.Message}");
            }
        }

    }
}
