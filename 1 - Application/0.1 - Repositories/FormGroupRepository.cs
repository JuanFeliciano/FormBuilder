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

        public async Task<List<FormsGroup>> Get()
        {
            string query = "SELECT * FROM FormsGroup;";

            DataTable formGroupDataTable = await _dbService.ExecuteQuery(query, null!);

            return formGroupDataTable.ConvertDataTableToList<FormsGroup>();
        }


        // GET METHOD by ID
        public async Task<FormsGroup> GetById(int id)
        {
            string query = "SELECT * FROM FormsGroup WHERE Id = @Id;";
            SqlParameter[] parameter = { new("@Id", id) };
            DataTable selectOperation = await _dbService.ExecuteQuery(query, parameter);

            List<FormsGroup> formsGroupList = selectOperation.ConvertDataTableToList<FormsGroup>();


            FormsGroup formsGroup = formsGroupList.Find(x => x.Id == id)!;

            List<Forms> formsList = await _forEach.SelectForEach(id);


            formsGroup.Forms = formsList;

            return formsGroup;
        }

        // POST METHOD
        public async Task<FormsGroup> Post([FromBody] FormsGroup formsGroup)
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

        public async Task<FormsGroup> Delete(int id)
        {
            FormsGroup selectFormsGroup = await GetById(id);


            await _forEach.DeleteForEach(id);

            string queryFormGroup = "DELETE FROM FormsGroup WHERE Id = @Id;";
            SqlParameter[] formGroupParameter = { new("@Id", id) };

            await _dbService.ExecuteQuery(queryFormGroup, formGroupParameter);


            return selectFormsGroup;
        }

    // UPDATE METHOD

    public async Task<FormsGroup> Update([FromBody] FormsGroup formGroup, int id)
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
