﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces.ServicesInterfaces;

namespace MovtechForms.Application.Controllers.CoreControllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class AnswerController : ControllerBase
    {
        private readonly IAnswerService _answerService;

        public AnswerController(IAnswerService answerService) => _answerService = answerService;

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return StatusCode(200, await _answerService.Get());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when querying object: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Answer[] answer)
        {
            try
            {
                return StatusCode(201, await _answerService.Post(answer));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error when creating object: {ex.Message}");
            }
        }
    }
}
