using Microsoft.AspNetCore.Mvc;
using MovtechForms.Application.Repositories;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data;

namespace MovtechForms.Application.Services
{
    public class QuestionService : IServices<Questions>
    {
        private readonly IRepository<Questions> _questionRepo;

        public QuestionService(IRepository<Questions> questionRepo) => _questionRepo = questionRepo;

        public async Task<string> Get()
        {
            DataTable selectResult = await _questionRepo.Get();
            string selectJson = ConvertFormat.ConvertDataTableToJson(selectResult);

            return selectJson;
        }

        public async Task<string> Post([FromBody] Questions questions)
        {
            if (string.IsNullOrWhiteSpace(questions.Content))
            {
                throw new Exception("The content cannot be null or empty");
            }

            DataTable insertResult = await _questionRepo.Post(questions);
            string insertJson = ConvertFormat.ConvertDataTableToJson(insertResult);

            return insertJson;
        }

        public async Task<string> Delete(int id)
        {
            DataTable deleteResult = await _questionRepo.Delete(id);    
            string deleteJson = ConvertFormat.ConvertDataTableToJson(deleteResult);

            return deleteJson;
        }

        public async Task<string> Update([FromBody] Questions questions, int id)
        {
            if (string.IsNullOrWhiteSpace(questions.Content))
            {
                throw new Exception("The content cannot be null or empty");
            }

            DataTable updateResult = await _questionRepo.Update(questions, id);
            string updateJson = ConvertFormat.ConvertDataTableToJson(updateResult);

            return updateJson;
        }
    }
}
