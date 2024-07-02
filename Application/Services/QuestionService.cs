using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data;
using System.Data.SqlClient;

namespace MovtechForms.Application.Services
{
    public class QuestionService : IServices<Questions>
    {
        private readonly IDatabaseService _dbService;

        public QuestionService(IDatabaseService dbService) => _dbService = dbService;

        public async Task<DataTable> Get()
        {
            string query = "SELECT * FROM Questions;";
            DataTable result = await _dbService.ExecuteQueryAsync(query, null!);

            return result;
        }

        public async Task<DataTable> Post([FromBody] Questions questions)
        {
            string query = "INSERT INTO Questions (IdForm, Content) OUTPUT INSERTED.Id VALUES (@IdForm, @Content)";
            string selectQuery = "SELECT * FROM Questions WHERE Id = @Id;";

            if (string.IsNullOrWhiteSpace(questions.Content))
            {
                throw new Exception("The content cannot be null or empty");
            }

            SqlParameter[] insertParameters =
            {
                new("@IdForm", questions.IdForm),
                new("@Content", questions.Content.Trim())
            };

            DataTable insertOperation
                = await _dbService.ExecuteQueryAsync(query, insertParameters);

            int insertId = Convert.ToInt32(insertOperation.Rows[0]["Id"]);
            SqlParameter[] selectParameter = { new("Id", insertId) };

            DataTable selectOperation = await _dbService.ExecuteQueryAsync(selectQuery, selectParameter);

            return selectOperation;
        }

        public async Task<DataTable> Delete(int id)
        {
            string deleteQuery = "DELETE FROM Questions WHERE Id = @Id;";
            string selectQuery = "SELECT * FROM Questions WHERE Id = @Id;";

            SqlParameter[] deleteParameter = { new("@Id", id) };
            SqlParameter[] selectParameter = { new("@Id", id) };

            DataTable selectOperation = await _dbService.ExecuteQueryAsync(selectQuery, selectParameter);
            await _dbService.ExecuteQueryAsync(deleteQuery, deleteParameter);

            return selectOperation;
        }

        public async Task<DataTable> Update([FromBody] Questions questions, int id)
        {
            string updateQuery = "UPDATE Questions SET IdForm = @IdForm, Content = @Content WHERE Id = @Id;";
            string selectQuery = "SELECT * FROM Questions WHERE Id = @Id;";

            if (string.IsNullOrWhiteSpace(questions.Content))
            {
                throw new Exception("The content cannot be null or empty");
            }

            SqlParameter[] updateParameters =
            {
                new("@IdGroup", questions.IdForm),
                new("@Title", questions.Content.Trim()),
                new("@Id", id)
            };

            SqlParameter[] selectParameter = { new("@Id", id) };

            await _dbService.ExecuteQueryAsync(updateQuery, updateParameters);

            DataTable selectOperation = await _dbService.ExecuteQueryAsync(selectQuery, selectParameter);

            return selectOperation;
        }
    }
}
