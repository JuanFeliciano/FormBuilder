using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;

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
                List<Questions> data = await _questionService.Get();

                return StatusCode(200, data);
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
                List<Questions> data = await _questionService.Post(questions);

                return StatusCode(201, data);
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
                List<Questions> data = await _questionService.Delete(id);

                return StatusCode(200, $"Successfully deleted object\n {data}");
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
                List<Questions> data = await _questionService.Update(questions, id);

                return StatusCode(201, data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when updating object: {ex.Message}");
            }
        }
    }
}
