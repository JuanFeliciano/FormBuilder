using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
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

        public async Task<DataTable> Get()
        {
            string query = "SELECT * FROM FormsGroup;";
            DataTable selectOperation = await _dbService.ExecuteQueryAsync(query, null!);

            return selectOperation;
        }


        // GET METHOD by ID
        public async Task<FormsGroup> GetById(int id)
        {
            string query = "SELECT * FROM FormsGroup WHERE Id = @Id;";
            SqlParameter[] parameter = { new("@Id", id) };
            DataTable selectOperation = await _dbService.ExecuteQueryAsync(query, parameter);

            List<FormsGroup> formsGroupList = selectOperation.ConvertDataTableToList<FormsGroup>();
            FormsGroup formsGroup = formsGroupList.Find(x => x.Id == id)!;


            string queryForms = "SELECT * FROM Forms WHERE IdGroup = @IdGroup;";
            SqlParameter[] formParameter = { new("@IdGroup", id) };
            DataTable selectFormOperation = await _dbService.ExecuteQueryAsync(queryForms, formParameter);

            List<Forms> formsList = selectFormOperation.ConvertDataTableToList<Forms>();

            formsGroup.Forms = formsList; 

            return formsGroup;
        }

        // POST METHOD
        public async Task<DataTable> Post([FromBody] FormsGroup formsGroup)
        {
            // insert operation
            string insertFormGroupQuery = "INSERT INTO FormsGroup (Title) OUTPUT INSERTED.Id VALUES (@Title);";
            SqlParameter[] formGroupParameters = { new("@Title", formsGroup.Title.Trim()) };
            DataTable insertResult = await _dbService.ExecuteQueryAsync(insertFormGroupQuery, formGroupParameters);
            int idFormGroup = Convert.ToInt32(insertResult.Rows[0]["Id"]);

            // insert forms and question operation
            await _forEachCommand.ForEach(formsGroup, idFormGroup);

            // select operation
            string selectQuery = "SELECT * FROM FormsGroup WHERE Id = @Id;";
            SqlParameter[] selectParameter = { new("@Id", idFormGroup) };
            DataTable selectResult = await _dbService.ExecuteQueryAsync(selectQuery, selectParameter);

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
