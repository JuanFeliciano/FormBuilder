using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data.SqlClient;
using System.Data;

namespace MovtechForms.Application.Repositories
{
    public class FormRepository : IRepository<Forms>
    {
        private readonly IDatabaseService _dbService;
        private readonly IForEach<Forms> _forEach;

        public FormRepository(IDatabaseService dbService, IForEach<Forms> forEach)
        {
            _dbService = dbService;
            _forEach = forEach;
        }

        // GET METHOD
        public async Task<DataTable> Get()
        {
            string query = "SELECT * FROM Forms;";
            DataTable selectOperation = await _dbService.ExecuteQueryAsync(query, null!);

            return selectOperation;
        }


        // GET by Id METHOD
        public async Task<Forms> GetById(int id)
        {
            // Seleciona o formulário pelo ID
            string selectForm = "SELECT * FROM Forms WHERE Id = @Id;";
            SqlParameter[] selectFormParameter = { new ("@Id", id) };
            DataTable selectResultForm = await _dbService.ExecuteQueryAsync(selectForm, selectFormParameter);

            List<Forms> forms = selectResultForm.ConvertDataTableToList<Forms>();

            Forms form = forms.Find(x => x.Id == id)!;

            string selectQuestions = "SELECT * FROM Questions WHERE IdForm = @IdForm;";
            SqlParameter[] selectQuestionsParameter = { new SqlParameter("@IdForm", form.Id) };
            DataTable selectResultQuestions = await _dbService.ExecuteQueryAsync(selectQuestions, selectQuestionsParameter);

            List<Questions> questions = selectResultQuestions.ConvertDataTableToList<Questions>();
            form.Questions = questions;

            return form;
        }


        // POST METHOD
        public async Task<Forms> Post([FromBody] Forms forms)
        {
            // insert operation
            string insertQuery = "INSERT INTO Forms (Title, IdGroup) OUTPUT INSERTED.Id VALUES (@Title, @IdGroup);";
            SqlParameter[] insertParameters =
            {
                new("@Title", forms.Title.Trim()),
                new("@IdGroup", forms.IdGroup)
            };
            DataTable insertResult = await _dbService.ExecuteQueryAsync(insertQuery, insertParameters);
            int idForm = Convert.ToInt32(insertResult.Rows[0]["Id"]);

            // insert question
            await _forEach.SelectForEach(forms, idForm);

            Forms selectForms = await GetById(idForm);

            return selectForms;
        }


        // DELETE METHOD
        public async Task<Forms> Delete(int id)
        {
            await _forEach.DeleteForEach(id);

            Forms selectForms = await GetById(id);

            return selectForms;
        }

        // PUT METHOD
        public async Task<Forms> Update([FromBody] Forms form, int id)
        {
            string updateQuery = "UPDATE Forms SET IdGroup = @IdGroup, Title = @Title, Questions = @Questions WHERE Id = @Id;";

            if (string.IsNullOrWhiteSpace(form.Title.Trim()))
            {
                throw new Exception("The title cannot be null or empty");
            }

            SqlParameter[] updateParameters =
            {
                new("@IdGroup", form.IdGroup),
                new("@Title", form.Title.Trim()),
                new("@Question", form.Questions),
                new("@Id", id)
            };

            await _dbService.ExecuteQueryAsync(updateQuery, updateParameters);

            Forms selectForms = await GetById(id);

            return selectForms;
        }
    }
}
