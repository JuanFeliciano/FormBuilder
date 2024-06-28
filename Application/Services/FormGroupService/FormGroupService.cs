using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data;
using System.Data.SqlClient;

namespace MovtechForms.Application.Services.GroupFormService
{
    public class FormGroupService : IFormGroupService
    {
        private static IDatabaseService? _dbService;

        public FormGroupService(IDatabaseService dbService) => _dbService = dbService;


        // GET METHOD
        public async Task<DataTable> GetFormGroup()
        {
            string query = "SELECT * FROM FormsGroup;";
            DataTable result = await _dbService!.ExecuteQueryAsync(query, null!);

            return result;
        }

        // POST METHOD
        public async Task<DataTable> PostFormGroup([FromBody] FormsGroup formGroup)
        {
            string query = "INSERT INTO FormsGroup (Title) OUTPUT INSERTED.Id VALUES (@Title);";
            SqlParameter[] parameters =
                {
                            new("@Title", formGroup.Title)
                        };

            var result = await _dbService!.ExecuteQueryAsync(query, parameters);

            if (result.Rows.Count <= 0)
            {
                throw new Exception("Erro ao criar grupo");
            }

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

        public async Task<DataTable> DeleteFormGroup(int id)
        {
            string deleteQuery = "DELETE FROM FormsGroup WHERE Id = @Id;";
            string selectQuery = "SELECT * FROM FormsGroup WHERE Id = @Id;";

            SqlParameter[] selectParameter =
            {
                new("@Id", id)
            };

            DataTable selectResult = await _dbService!.ExecuteQueryAsync(selectQuery, selectParameter);


            SqlParameter[] deleteParameter =
                {
                    new("@Id", id)
                };

            DataTable itemDeleted = await _dbService!.ExecuteQueryAsync(deleteQuery, deleteParameter);

            return selectResult;
        }

        // UPDATE METHOD

        public async Task<DataTable> UpdateFormGroup([FromBody] FormsGroup formGroup, int id)
        {
            string query = "UPDATE FormsGroup SET Title = @Title WHERE Id = @Id;";

            SqlParameter[] parameter =
            {
                new("@Title",formGroup.Title ),
                new("@Id", id)
            };

            DataTable result = await _dbService!.ExecuteQueryAsync(query, parameter);

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
