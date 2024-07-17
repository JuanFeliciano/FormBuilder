using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces.RepositoryInterfaces;
using MovtechForms.Domain.Interfaces.ServicesInterfaces;
using System.Data;

namespace MovtechForms.Application.Services.CoreServices
{
    public class AnswerService : IAnswerService
    {
        private readonly IAnswerRepository _answerRepo;

        public AnswerService(IAnswerRepository answerRepo)
        {
            _answerRepo = answerRepo;
        }

        public async Task<List<Answer>> Get()
        {
            DataTable answerData = await _answerRepo.GetAnswer();
            List<Answer> answerList = answerData.ConvertDataTableToList<Answer>();

            if (answerList is null || answerList.Count is 0)
            {
                throw new Exception("There are no answers");
            }

            return answerList;
        }

        public async Task<List<Answer>> Post([FromBody] Answer answer)
        {
            DataTable answerDataTable = await _answerRepo.PostAnswer(answer);

            return answerDataTable.ConvertDataTableToList<Answer>();
            
        }


    }
}
