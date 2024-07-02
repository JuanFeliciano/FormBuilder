using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data;
using System.Data.SqlClient;

namespace MovtechForms.Application.Services
{
    public class FormGroupService : IServices<FormsGroup>
    {
        private readonly IDatabaseService _dbService;

        public FormGroupService(IDatabaseService dbService) => _dbService = dbService;


        // GET METHOD
        public async Task<DataTable> Get()
        {
            string query = "SELECT * FROM FormsGroup;";
            DataTable result = await _dbService.ExecuteQueryAsync(query, null!);

            return result;
        }

        // POST METHOD
        public async Task<DataTable> Post([FromBody] FormsGroup formGroup)
        {
            string query = "INSERT INTO FormsGroup (Title) OUTPUT INSERTED.Id VALUES (@Title);";

            if (string.IsNullOrWhiteSpace(formGroup.Title))
            {
                throw new Exception("The value cannot be null or empty");
            }

            SqlParameter[] parameters =
                {
                    new("@Title", formGroup.Title.Trim())
                };

            var result = await _dbService.ExecuteQueryAsync(query, parameters);

            int newId = Convert.ToInt32(result.Rows[0]["Id"]);

            string selectQuery = "SELECT * FROM FormsGroup WHERE Id = @Id;";

            SqlParameter[] selectParameter =
            {
                new("@Id", newId)
            };

            DataTable selectResult = await _dbService.ExecuteQueryAsync(selectQuery, selectParameter);

            return selectResult;
        }

        // DELETE METHOD

        public async Task<DataTable> Delete(int id)
        {
            string deleteQuery = "DELETE FROM FormsGroup WHERE Id = @Id;";
            string selectQuery = "SELECT * FROM FormsGroup WHERE Id = @Id;";

            SqlParameter[] parameter = { new("Id", id) };
            SqlParameter[] Delparameter = { new("Id", id) };

            DataTable selectResult = await _dbService.ExecuteQueryAsync(selectQuery, parameter);
            DataTable itemDeleted = await _dbService.ExecuteQueryAsync(deleteQuery, Delparameter);

            return selectResult;
        }

        // UPDATE METHOD

        public async Task<DataTable> Update([FromBody] FormsGroup formGroup, int id)
        {
            string query = "UPDATE FormsGroup SET Title = @Title WHERE Id = @Id;";

            if (string.IsNullOrWhiteSpace(formGroup.Title))
            {
                throw new Exception("The title cannot be null or empty");
            }

            SqlParameter[] parameter =
            {
                new("@Title",formGroup.Title.Trim()),
                new("@Id", id)
            };

            DataTable result = await _dbService.ExecuteQueryAsync(query, parameter);

            string selectQuery = "SELECT * FROM FormsGroup WHERE Id = @Id;";

            SqlParameter[] selectParameter =
            {
                        new("@Id", id)
                    };

            DataTable selectResult = await _dbService.ExecuteQueryAsync(selectQuery, selectParameter);

            return selectResult;
        }
    }
}
