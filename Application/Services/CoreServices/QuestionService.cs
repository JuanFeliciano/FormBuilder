using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data;

namespace MovtechForms.Application.Services.MainServices
{
    public class QuestionService : IServices<Questions>
    {
        private readonly IRepository<Questions> _questionRepo;

        public QuestionService(IRepository<Questions> questionRepo) => _questionRepo = questionRepo;


        public async Task<List<Questions>> Get()
        {
            DataTable selectResult = await _questionRepo.Get();

            return selectResult.ConvertDataTableToList<Questions>();
        }

        public async Task<Questions> GetById(int id)
        {
            return await _questionRepo.GetById(id);
        }

        public async Task<Questions> Post([FromBody] Questions questions)
        {
            if (string.IsNullOrWhiteSpace(questions.Content.Trim()))
            {
                throw new Exception("The content cannot be null or empty");
            }

            return await _questionRepo.Post(questions);
        }

        public async Task<Questions> Delete(int id)
        {
            return await _questionRepo.Delete(id);
        }

        public async Task<Questions> Update([FromBody] Questions questions, int id)
        {
            if (string.IsNullOrWhiteSpace(questions.Content))
            {
                throw new Exception("The content cannot be null or empty");
            }

            return await _questionRepo.Update(questions, id);
        }
    }
}
