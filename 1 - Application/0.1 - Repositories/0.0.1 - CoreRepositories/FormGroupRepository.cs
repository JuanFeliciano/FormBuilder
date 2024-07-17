using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data.SqlClient;
using System.Data;
using MovtechForms.Domain.Interfaces.RepositoryInterfaces;
using MovtechForms.Domain.Interfaces.ServicesInterfaces;

namespace MovtechForms.Application.Repositories.MainRepositories
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

            return await _dbService.ExecuteQuery(query, null!);
        }


        // GET METHOD by ID
        public async Task<FormsGroup> GetById(int id)
        {
            /// operation select FormsGroup
            string query = "SELECT * FROM FormsGroup WHERE Id = @Id;";
            SqlParameter[] parameter = { new("@Id", id) };
            DataTable selectOperation = await _dbService.ExecuteQuery(query, parameter);

            List<FormsGroup> formsGroupList = selectOperation.ConvertDataTableToList<FormsGroup>();


            FormsGroup formsGroup = formsGroupList.Find(x => x.Id == id)!;

            /// operation select Forms
            string queryForms = "SELECT * FROM Forms WHERE IdGroup = @IdGroup;";
            SqlParameter[] formParameter = { new("@IdGroup", id) };
            DataTable selectFormOperation = await _dbService.ExecuteQuery(queryForms, formParameter);

            List<Forms> formsList = selectFormOperation.ConvertDataTableToList<Forms>();

            foreach (Forms form in formsList)
            {
                string queryQuestion = "SELECT * FROM Questions WHERE IdForm = @IdForm;";
                SqlParameter[] questionParameter = { new("@IdForm", form.Id) };
                DataTable selectQuestionOperation = await _dbService.ExecuteQuery(queryQuestion, questionParameter);

                List<Questions> questionList = selectQuestionOperation.ConvertDataTableToList<Questions>();

                form.Questions = questionList;
            }

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
            await _forEachCommand.InsertForEach(formsGroup, idFormGroup);

            /// select operation
            return await GetById(idFormGroup);
        }

        // DELETE METHOD

        public async Task<FormsGroup> Delete(int id)
        {
            FormsGroup selectFormsGroup = await GetById(id);


            string selectForm = "SELECT * FROM FormsGroup WHERE Id = @Id;";
            SqlParameter[] selectFormGroupParameter = { new("@Id", id) };

            DataTable formGroupSelect = await _dbService.ExecuteQuery(selectForm, selectFormGroupParameter);
            List<FormsGroup> formGroupList = formGroupSelect.ConvertDataTableToList<FormsGroup>();

            await _forEachCommand.DeleteForEach(id);

            foreach (FormsGroup formsGroup in formGroupList)
            {
                string queryFormGroup = "DELETE FROM FormsGroup WHERE Id = @Id;";
                SqlParameter[] formGroupParameter = { new("@Id", id) };

                await _dbService.ExecuteQuery(queryFormGroup, formGroupParameter);
            }


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
