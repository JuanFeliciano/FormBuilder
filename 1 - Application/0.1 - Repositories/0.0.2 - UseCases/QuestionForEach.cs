using Microsoft.AspNetCore.Mvc;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._5___UsecasesInterfaces;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces.ServicesInterfaces;
using System.Data;
using System.Data.SqlClient;

namespace MovtechForms.Application.Repositories.UseCases
{
    public class QuestionForEach : IQuestionForEach
    {
        private readonly IDatabaseService _dbService;

        public QuestionForEach(IDatabaseService dbService) => _dbService = dbService;


        public async Task<List<Answer>> SelectForEach(int id)
        {
            string queryAnswer = "SELECT * FROM Answer WHERE IdQuestion = @IdQuestion;";
            SqlParameter[] answerParameter = { new("@IdQuestion", id) };

            DataTable selectAnswerOperation = await _dbService.ExecuteQuery(queryAnswer, answerParameter);

            List<Answer> answerList = selectAnswerOperation.ConvertDataTableToList<Answer>();

            return answerList;
        }


        public async Task InsertForEach([FromBody] Questions question, int id)
        {

            foreach (Answer answer in question.Answers)
            {
                string query = "INSERT INTO Answer (IdQuestion, Note, Description) OUTPUT INSERTED.Id VALUES (@IdQuestion, @Note, @Description);";
                SqlParameter[] answerParameter =
                {
                    new("@IdQuestion", id),
                    new("@Note", answer.Grade),
                    new("@Description", answer.Description)
                };

                DataTable answerDataTable = await _dbService.ExecuteQuery(query, answerParameter);

                List<Answer> answerList = answerDataTable.ConvertDataTableToList<Answer>();

                question.Answers = answerList;
            }
        }

        public async Task DeleteForEach(int id)
        {
            string query = "DELETE FROM Answer WHERE IdQuestion = @IdQuestion;";
            SqlParameter[] answerParameter = { new("@IdQuestion", id) };

            await _dbService.ExecuteQuery(query, answerParameter);
        }
    }
}
