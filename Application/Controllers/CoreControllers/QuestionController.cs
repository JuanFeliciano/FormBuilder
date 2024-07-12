using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;

namespace MovtechForms.Application.Controllers.CoreControllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuestionController : Controller
    {
        private readonly IServices<Questions> _questionService;

        public QuestionController(IServices<Questions> qtService) => _questionService = qtService;



        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return StatusCode(200, await _questionService.Get());
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
                return StatusCode(200, await _questionService.GetById(id));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when querying objects: {ex.Message}");
            }
        }


        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Questions questions)
        {
            try
            {
                return StatusCode(201, await _questionService.Post(questions));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when creating question: {ex.Message}");
            }
        }


        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _questionService.Delete(id);

                return StatusCode(200, "Successfully deleted object");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when deleting object: {ex.Message}");
            }
        }


        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] Questions questions, int id)
        {
            try
            {
                return StatusCode(201, await _questionService.Update(questions, id));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when updating object: {ex.Message}");
            }
        }
    }
}
