using Microsoft.AspNetCore.Mvc;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._2___HandlerInterfaces;
using MovtechForms.Application;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces.RepositoryInterfaces;
using System.Data;

namespace MovtechForms._1___Application._0._2___CommandHandler
{
    public class AnswerHandler : IAnswerHandler
    {
        private readonly IAnswerRepository _answerRepo;

        public AnswerHandler(IAnswerRepository answerRepo)
        {
            _answerRepo = answerRepo;
        }

        public async Task<List<Answer>> GetAnswer()
        {
            DataTable answerData = await _answerRepo.GetAnswer();

            if (answerData.Rows.Count is 0)
            {
                throw new Exception("There are no answers");
            }

            return answerData.ConvertDataTableToList<Answer>();
        }

        public async Task<List<Answer>> PostAnswer([FromBody] Answer answer)
        {
            if (answer.Grade < 0 || answer.Grade > 10)
                throw new Exception("The grade is invalid, it cannot be greater than 10 or less than 0");

            DataTable answerDataTable = await _answerRepo.PostAnswer(answer);

            return answerDataTable.ConvertDataTableToList<Answer>();

        }
    }
}
