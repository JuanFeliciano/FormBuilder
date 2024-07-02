using Microsoft.AspNetCore.Mvc;
using Microsoft.SqlServer.Server;
using MovtechForms.Application.Services;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data;

namespace MovtechForms.Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuestionController : Controller
    {
        private readonly IServices<Questions> _questionService;

        public QuestionController(IServices<Questions> qtService) => _questionService = qtService;

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                DataTable data = await _questionService.Get();
                string dataJson = ConvertFormat.ConvertDataTableToJson(data);

                if (dataJson is "[]")
                {
                    return NotFound("There are no questions");
                }

                return StatusCode(200, dataJson);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when querying objects: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Questions questions)
        {
            try
            {
                DataTable data = await _questionService.Post(questions);
                string dataJson = ConvertFormat.ConvertDataTableToJson(data);

                return StatusCode(201, dataJson);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when creating question: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                DataTable data = await _questionService.Delete(id);
                string dataJson = ConvertFormat.ConvertDataTableToJson(data);

                if (dataJson is "[]")
                {
                    return NotFound("ID parameter doesn't exist");
                }

                return StatusCode(200, $"Successfully deleted object\n {dataJson}");
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Error when deleting object: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] Questions questions, int id)
        {
            try
            {
                DataTable data = await _questionService.Update(questions, id);
                string dataJson = ConvertFormat.ConvertDataTableToJson(data);

                if (dataJson is "[]")
                {
                    return StatusCode(404, "Error id doesn't exist");
                }

                return StatusCode(201, dataJson);
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Error when updating object: {ex.Message}");
            }
        }
    }
}
