using Microsoft.AspNetCore.Mvc;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._2___HandlerInterfaces;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._3___ServicesInterfaces;
using MovtechForms.Domain.Entities;

namespace MovtechForms.Application.Services.MainServices
{
    public class QuestionService : IQuestionService
    {
        private readonly IQuestionHandler _questionHandler;

        public QuestionService(IQuestionHandler questionHandler) => _questionHandler = questionHandler;


        public async Task<List<Question>> Get()
        {
            return await _questionHandler.Get();
        }

        public async Task<Question> GetById(int id)
        {
            return await _questionHandler.GetById(id);
        }

        public async Task<List<Question>> Post([FromBody] Question[] questions)
        {
            return await _questionHandler.Post(questions);
        }

        public async Task<Question> Delete(int id)
        {
            return await _questionHandler.Delete(id);
        }

        public async Task<Question> Update([FromBody] Question questions, int id)
        {
            return await _questionHandler.Update(questions, id);
        }
    }
}
