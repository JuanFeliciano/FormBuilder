using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovtechForms.Application.Services;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;

namespace MovtechForms.Application.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class FormGroupController : ControllerBase
    {
        private readonly IServices<FormsGroup> _formGroupRepo;
        private readonly TokenService _tokenService;

        public FormGroupController(IServices<FormsGroup> formGroupRepo, TokenService token)
        {
            _formGroupRepo = formGroupRepo;
            _tokenService = token;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                List<FormsGroup> data = await _formGroupRepo.Get();

                return StatusCode(200, data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when querying data: {ex.Message}");
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                FormsGroup data = await _formGroupRepo.GetById(id);

                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when querying data: {ex.Message}");
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] FormsGroup formGroup)
        {
            try
            {
                FormsGroup data = await _formGroupRepo.Post(formGroup);

                return StatusCode(201, data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when creating group: {ex.Message}");
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                FormsGroup data = await _formGroupRepo.Delete(id);

                return StatusCode(200, data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when deleting object: {ex.Message}");
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] FormsGroup formGroup, int id)
        {
            try
            {
                FormsGroup data = await _formGroupRepo.Update(formGroup, id);

                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when updating object: {ex.Message}");
            }
        }

    }
}
