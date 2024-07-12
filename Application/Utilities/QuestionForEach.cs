using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data;
using System.Data.SqlClient;

namespace MovtechForms.Application.Utilities
{
    public class QuestionForEach : IForEach<Questions>
    {
        private readonly IDatabaseService _dbService;

        public QuestionForEach(IDatabaseService dbService) => _dbService = dbService;

        public async Task InsertForEach([FromBody] Questions question, int id)
        {

            foreach (Answer answer in question.Answers)
            {
                string query = "INSERT INTO Answer (IdQuestion, Note, Description) OUTPUT INSERTED.Id VALUES (@IdQuestion, @Note, @Description);";
                SqlParameter[] answerParameter =
                {
                    new("@IdQuestion", id),
                    new("@Note", answer.Note),
                    new("@Description", answer.Description)
                };

                DataTable answerDataTable = await _dbService.ExecuteQueryAsync(query, answerParameter);

                List<Answer> answerList = answerDataTable.ConvertDataTableToList<Answer>();

                question.Answers = answerList;
            }
        }

        public async Task DeleteForEach(int id)
        {
            string query = "DELETE FROM Answer WHERE IdQuestion = @IdQuestion;";
            SqlParameter[] answerParameter = { new("@IdQuestion", id) };

            await _dbService.ExecuteQueryAsync(query, answerParameter);
        }
    }
}
