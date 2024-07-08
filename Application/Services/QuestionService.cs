using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data;

namespace MovtechForms.Application.Services
{
    public class QuestionService : IServices<Questions>
    {
        private readonly IRepository<Questions> _questionRepo;

        public QuestionService(IRepository<Questions> questionRepo) => _questionRepo = questionRepo;


        public async Task<List<Questions>> Get()
        {
            DataTable selectResult = await _questionRepo.Get();
            List<Questions> selectQuestion = selectResult.ConvertDataTableToList<Questions>();

            return selectQuestion;
        }

        public async Task<Questions> GetById(int id)
        {
            Questions selectResult = await _questionRepo.GetById(id);

            return selectResult;
        }

        public async Task<Questions> Post([FromBody] Questions questions)
        {
            if (string.IsNullOrWhiteSpace(questions.Content.Trim()))
            {
                throw new Exception("The content cannot be null or empty");
            }

            Questions insertResult = await _questionRepo.Post(questions);

            return insertResult;
        }

        public async Task<Questions> Delete(int id)
        {
            Questions deleteResult = await _questionRepo.Delete(id);    

            return deleteResult;
        }

        public async Task<Questions> Update([FromBody] Questions questions, int id)
        {
            if (string.IsNullOrWhiteSpace(questions.Content))
            {
                throw new Exception("The content cannot be null or empty");
            }

            Questions updateResult = await _questionRepo.Update(questions, id);

            return updateResult;
        }
    }
}
