using Microsoft.AspNetCore.Mvc;
using MovtechForms.Application.Utilities;
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
            List<Questions> selectQuestions = selectResult.ConvertDataTableToList<Questions>();

            return selectQuestions;
        }

        public async Task<List<Questions>> Post([FromBody] Questions questions)
        {
            if (string.IsNullOrWhiteSpace(questions.Content))
            {
                throw new Exception("The content cannot be null or empty");
            }

            DataTable insertResult = await _questionRepo.Post(questions);
            List<Questions> insertQuestions = insertResult.ConvertDataTableToList<Questions>();

            return insertQuestions;
        }

        public async Task<List<Questions>> Delete(int id)
        {
            DataTable deleteResult = await _questionRepo.Delete(id);    
            List<Questions> deleteQuestions = deleteResult.ConvertDataTableToList<Questions>();

            return deleteQuestions;
        }

        public async Task<List<Questions>> Update([FromBody] Questions questions, int id)
        {
            if (string.IsNullOrWhiteSpace(questions.Content))
            {
                throw new Exception("The content cannot be null or empty");
            }

            DataTable updateResult = await _questionRepo.Update(questions, id);
            List<Questions> updateQuestions = updateResult.ConvertDataTableToList<Questions>();

            return updateQuestions;
        }
    }
}
