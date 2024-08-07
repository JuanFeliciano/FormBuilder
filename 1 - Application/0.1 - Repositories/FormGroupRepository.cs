using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data.SqlClient;
using System.Data;
using MovtechForms.Domain.Interfaces.ServicesInterfaces;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._1___RepositoryInterfaces._0._0._0._1___CoreInterfaces;

namespace MovtechForms.Application.Repositories.MainRepositories
{
    public class FormGroupRepository : IFormGroupRepository
    {
        private readonly IDatabaseService _dbService;
        private readonly IFormGroupForEach _forEach;

        public FormGroupRepository(IDatabaseService dbService, IFormGroupForEach forEachCommand)
        {
            _dbService = dbService;
            _forEach = forEachCommand;
        }

        public async Task<List<FormGroup>> Get()
        {
            string query = "SELECT * FROM FormsGroup;";

            DataTable formGroupDataTable = await _dbService.ExecuteQuery(query, null!);

            return formGroupDataTable.ConvertDataTableToList<FormGroup>();
        }


        // GET METHOD by ID
        public async Task<FormGroup> GetById(int id)
        {
            string query = "SELECT * FROM FormsGroup WHERE Id = @Id;";
            SqlParameter[] parameter = { new("@Id", id) };
            DataTable selectOperation = await _dbService.ExecuteQuery(query, parameter);

            List<FormGroup> formsGroupList = selectOperation.ConvertDataTableToList<FormGroup>();

            FormGroup formsGroup = formsGroupList.Find(x => x.Id == id)!;

            List<Form> formsList = await _forEach.SelectForEach(id);


            formsGroup.Forms = formsList;

            return formsGroup;
        }

        // POST METHOD
        public async Task<FormGroup> Post([FromBody] FormGroup formsGroup)
        {
            /// insert operation
            string insertFormGroupQuery = "INSERT INTO FormsGroup (Title) OUTPUT INSERTED.Id VALUES (@Title);";
            SqlParameter[] formGroupParameters = { new("@Title", formsGroup.Title.Trim()) };

            DataTable insertResult = await _dbService.ExecuteQuery(insertFormGroupQuery, formGroupParameters);
            int idFormGroup = Convert.ToInt32(insertResult.Rows[0]["Id"]);

            /// insert forms and question operation
            await _forEach.InsertForEach(formsGroup, idFormGroup);

            /// select operation
            return await GetById(idFormGroup);
        }

        // DELETE METHOD

        public async Task<FormGroup> Delete(int id)
        {
            FormGroup selectFormsGroup = await GetById(id);


            await _forEach.DeleteForEach(id);

            string queryFormGroup = "DELETE FROM FormsGroup WHERE Id = @Id;";
            SqlParameter[] formGroupParameter = { new("@Id", id) };

            await _dbService.ExecuteQuery(queryFormGroup, formGroupParameter);


            return selectFormsGroup;
        }

    // UPDATE METHOD

    public async Task<FormGroup> Update([FromBody] FormGroup formGroup, int id)
    {
        string updateQuery = "UPDATE FormsGroup SET Title = @Title WHERE Id = @Id;";

        SqlParameter[] updateParameter =
        {
                new("@Title",formGroup.Title.Trim()),
                new("@Id", id)
            };

        await _dbService.ExecuteQuery(updateQuery, updateParameter);

        return await GetById(id);
    }
}
}
