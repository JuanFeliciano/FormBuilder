using Microsoft.AspNetCore.Mvc;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._1___RepositoryInterfaces._0._0._0._1___CoreInterfaces;
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
        private readonly IQuestionRepository _questionRepo;

        public AnswerHandler(IAnswerRepository answerRepo, IQuestionRepository questionRepo)
        {
            _answerRepo = answerRepo;
            _questionRepo = questionRepo;
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

        public async Task<List<Answer>> PostAnswer([FromBody] Answer[] answerListBody)
        {
            List<Question> allQuestions = await _questionRepo.Get();

            foreach (Answer answerBody in answerListBody)
            {
                var answer = allQuestions.FirstOrDefault(i => i.Id == answerBody.IdQuestion);

                if (answer is null)
                    throw new Exception($"Parameter IdQuestion: {answerBody.IdQuestion} is invalid");
            }

            foreach (Answer answer in answerListBody)
            {
                if (answer.Grade < 0 || answer.Grade > 10)
                    throw new Exception("The grade is invalid, it cannot be greater than 10 or less than 0");
            }

            DataTable answerDataTable = await _answerRepo.PostAnswer(answerListBody);

            return answerDataTable.ConvertDataTableToList<Answer>();

        }
    }
}
