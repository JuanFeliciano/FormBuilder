using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces.RepositoryInterfaces;
using MovtechForms.Domain.Interfaces.ServicesInterfaces;
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
            string query = "INSERT INTO Answer (IdQuestion, Grade, Description) OUTPUT INSERTED.Id VALUES (@IdQuestion, @Grade, @Description);";
            SqlParameter[] parameters =
            {
                new("@IdQuestion", answer.IdQuestion),
                new("@Grade", answer.Grade),
                new("@Description", answer.Description)
            };


            DataTable answerCreated = await _dbService.ExecuteQuery(query, parameters);

            int idAnswer = Convert.ToInt32(answerCreated.Rows[0]["Id"]);

            return await GetSingleAnswer(idAnswer);
        }

        public async Task<DataTable> GetAnswer()
        {
            string query = "SELECT * FROM Answer;";

            return await _dbService.ExecuteQuery(query, null!);
        }

        public async Task<DataTable> GetSingleAnswer(int idAnswer)
        {
            string query = "SELECT * FROM Answer WHERE Id = @Id;";
            SqlParameter[] parameter = { new("@Id", idAnswer) };

            return await _dbService.ExecuteQuery(query, parameter);
        }
    }
}
