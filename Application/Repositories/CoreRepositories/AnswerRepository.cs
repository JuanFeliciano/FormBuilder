using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data;
using System.Data.SqlClient;

namespace MovtechForms.Application.Repositories.MainRepositories
{
    public class AnswerRepository : IAnswerRepository
    {
        private readonly IDatabaseService _dbService;

        public AnswerRepository(IDatabaseService db) => _dbService = db;

        public async Task<DataTable> PostAnswer([FromBody] Answer answer)
        {
            string query = "INSERT INTO Answer (IdQuestion, Note, Description) OUTPUT INSERTED.Id VALUES (@IdQuestion, @Note, @Description);";
            SqlParameter[] parameters =
            {
                new("@IdQuestion", answer.IdQuestion),
                new("@Note", answer.Note),
                new("@Description", answer.Description)
            };

            DataTable answerCreated = await _dbService.ExecuteQueryAsync(query, parameters);
            int idAnswer = Convert.ToInt32(answerCreated.Rows[0]["Id"]);

            return await GetSingleAnswer(idAnswer);
        }

        public async Task<DataTable> GetAnswer()
        {
            string query = "SELECT * FROM Answer;";

            return await _dbService.ExecuteQueryAsync(query, null!);
        }

        public async Task<DataTable> GetSingleAnswer(int idAnswer)
        {
            string query = "SELECT * FROM Answer WHERE Id = @Id;";
            SqlParameter[] parameter = { new("@Id", idAnswer) };

            return await _dbService.ExecuteQueryAsync(query, parameter);
        }
    }
}
