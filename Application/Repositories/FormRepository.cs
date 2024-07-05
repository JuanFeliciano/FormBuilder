using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data.SqlClient;
using System.Data;
using MovtechForms.Application.Utilities;

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
        public async Task<DataTable> GetById(int id)
        {
            // Seleciona o formulário pelo ID
            string selectForm = "SELECT * FROM Forms WHERE Id = @Id;";
            SqlParameter[] selectFormParameter = { new SqlParameter("@Id", id) };
            DataTable selectResultForm = await _dbService.ExecuteQueryAsync(selectForm, selectFormParameter);

            if (selectResultForm.Rows.Count == 0)
            {
                throw new Exception($"Formulário com ID {id} não encontrado.");
            }

            // Converte o resultado para uma lista de Forms
            List<Forms> forms = selectResultForm.ConvertDataTableToList<Forms>();

            // Encontra o formulário específico
            Forms form = forms.Find(x => x.Id == id)!;

            if (form == null)
            {
                throw new Exception($"Formulário com ID {id} não encontrado na lista convertida.");
            }

            // Seleciona as perguntas relacionadas ao formulário
            string selectQuestions = "SELECT * FROM Questions WHERE IdForm = @IdForm;";
            SqlParameter[] selectQuestionsParameter = { new SqlParameter("@IdForm", form.Id) };
            DataTable selectResultQuestions = await _dbService.ExecuteQueryAsync(selectQuestions, selectQuestionsParameter);

            // Converte o resultado para uma lista de Questions e atribui ao formulário
            List<Questions> questions = selectResultQuestions.ConvertDataTableToList<Questions>();
            form.Questions = questions;

            return selectResultForm;
        }


        // POST METHOD
        public async Task<DataTable> Post([FromBody] Forms forms)
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
            await _forEach.ForEach(forms, idForm);

            // select operation
            string selectQuery = "SELECT * FROM Forms WHERE Id = @Id;";
            SqlParameter[] selectParameters = { new("@Id", idForm) };
            DataTable selectResult = await _dbService.ExecuteQueryAsync(selectQuery, selectParameters);

            return selectResult;
        }


        // DELETE METHOD
        public async Task<DataTable> Delete(int id)
        {
            string deleteQuery = "DELETE FROM Forms WHERE Id = @Id;";
            string selectQuery = "SELECT * FROM Forms WHERE Id = @Id;";

            SqlParameter[] parameter = { new("Id", id) };
            SqlParameter[] Delparameter = { new("Id", id) };


            DataTable selectResult = await _dbService.ExecuteQueryAsync(selectQuery, parameter);
            DataTable deleteResult = await _dbService.ExecuteQueryAsync(deleteQuery, Delparameter);

            return selectResult;
        }

        // PUT METHOD
        public async Task<DataTable> Update([FromBody] Forms form, int id)
        {
            string updateQuery = "UPDATE Forms SET IdGroup = @IdGroup, Title = @Title, Questions = @Questions WHERE Id = @Id;";
            string selectQuery = "SELECT * FROM Forms WHERE Id = @Id;";

            if (string.IsNullOrWhiteSpace(form.Title))
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

            SqlParameter[] selectParameter = { new("@Id", id) };

            await _dbService.ExecuteQueryAsync(updateQuery, updateParameters);

            DataTable result = await _dbService.ExecuteQueryAsync(selectQuery, selectParameter);

            return result;
        }
    }
}
