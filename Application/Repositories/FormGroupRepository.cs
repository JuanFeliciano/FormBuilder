using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using MovtechForms.Infrastructure;
using System.Data.SqlClient;
using System.Data;

namespace MovtechForms.Application.Repositories
{
    public class FormGroupRepository : IRepository<FormsGroup>
    {
        private readonly IDatabaseService _dbService;
        private readonly IForEach<FormsGroup> _forEachCommand;

        public FormGroupRepository(IDatabaseService dbService, IForEach<FormsGroup> forEachCommand)
        {
            _dbService = dbService;
            _forEachCommand = forEachCommand;
        }



        // GET METHOD
        public async Task<DataTable> Get()
        {
            string query = "SELECT * FROM FormsGroup;";
            DataTable selectOperation = await _dbService.ExecuteQueryAsync(query, null!);

            return selectOperation;
        }

        // POST METHOD
        public async Task<DataTable> Post([FromBody] FormsGroup formsGroup)
        {
            string insertFormGroupQuery = "INSERT INTO FormsGroup (Title) OUTPUT INSERTED.Id VALUES (@Title);";
            string selectQuery = "SELECT * FROM FormsGroup WHERE Id = @Id;";
            SqlParameter[] formGroupParameters = { new("@Title", formsGroup.Title.Trim()) };

            DataTable result = await _dbService.ExecuteQueryAsync(insertFormGroupQuery, formGroupParameters);
            int newId = Convert.ToInt32(result.Rows[0]["Id"]);
            SqlParameter[] selectParameter = { new("@Id", newId) };

            DataTable selectResult = await _dbService.ExecuteQueryAsync(selectQuery, selectParameter);

            _forEachCommand.ForEach(formsGroup);

            return selectResult;
        }

        // DELETE METHOD

        public async Task<DataTable> Delete(int id)
        {
            string deleteQuery = "DELETE FROM FormsGroup WHERE Id = @Id;";
            string selectQuery = "SELECT * FROM FormsGroup WHERE Id = @Id;";

            SqlParameter[] parameter = { new("Id", id) };
            SqlParameter[] delParameter = { new("Id", id) };

            DataTable selectResult = await _dbService.ExecuteQueryAsync(selectQuery, parameter);
            DataTable itemDeleted = await _dbService.ExecuteQueryAsync(deleteQuery, delParameter);

            return selectResult;
        }

        // UPDATE METHOD

        public async Task<DataTable> Update([FromBody] FormsGroup formGroup, int id)
        {
            string updateQuery = "UPDATE FormsGroup SET Title = @Title WHERE Id = @Id;";

            SqlParameter[] updateParameter =
            {
                new("@Title",formGroup.Title.Trim()),
                new("@Id", id)
            };

            DataTable result = await _dbService.ExecuteQueryAsync(updateQuery, updateParameter);

            string selectQuery = "SELECT * FROM FormsGroup WHERE Id = @Id;";

            SqlParameter[] selectParameter = { new("@Id", id) };
            DataTable selectResult = await _dbService.ExecuteQueryAsync(selectQuery, selectParameter);

            return selectResult;
        }
    }
}
