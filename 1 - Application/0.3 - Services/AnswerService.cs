using Microsoft.AspNetCore.Mvc;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._2___HandlerInterfaces;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces.ServicesInterfaces;

namespace MovtechForms.Application.Services.CoreServices
{
    public class AnswerService : IAnswerService
    {
        private readonly IAnswerHandler _answerHandler;

        public AnswerService(IAnswerHandler answerHandler)
        {
            _answerHandler = answerHandler;
        }

        public async Task<List<Answer>> Get()
        {
            return await _answerHandler.GetAnswer();
        }

        public async Task<List<Answer>> Post([FromBody] Answer[] answer)
        {
            return await _answerHandler.PostAnswer(answer);
        }
    }
}
