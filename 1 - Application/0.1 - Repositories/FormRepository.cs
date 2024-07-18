using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data.SqlClient;
using System.Data;
using MovtechForms.Domain.Interfaces.ServicesInterfaces;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._1___RepositoryInterfaces._0._0._0._1___CoreInterfaces;

namespace MovtechForms.Application.Repositories.MainRepositories
{
    public class FormRepository : IFormRepository
    {
        private readonly IDatabaseService _dbService;
        private readonly IForEach<Forms> _forEach;

        public FormRepository(IDatabaseService dbService, IForEach<Forms> forEach)
        {
            _dbService = dbService;
            _forEach = forEach;
        }

        // GET METHOD
        public async Task<List<Forms>> Get()
        {
            string query = "SELECT * FROM Forms;";

            DataTable formDataTable = await _dbService.ExecuteQuery(query, null!);

            List<Forms> forms = formDataTable.ConvertDataTableToList<Forms>();

            return forms;
        }


        // GET by Id METHOD
        public async Task<Forms> GetById(int id)
        {
            // Seleciona o formulário pelo ID
            string selectForm = "SELECT * FROM Forms WHERE Id = @Id;";
            SqlParameter[] selectFormParameter = { new("@Id", id) };
            DataTable selectResultForm = await _dbService.ExecuteQuery(selectForm, selectFormParameter);

            List<Forms> forms = selectResultForm.ConvertDataTableToList<Forms>();

            Forms form = forms.Find(x => x.Id == id)!;


            string selectQuestions = "SELECT * FROM Questions WHERE IdForm = @IdForm;";
            SqlParameter[] selectQuestionsParameter = { new SqlParameter("@IdForm", id) };
            DataTable selectResultQuestions = await _dbService.ExecuteQuery(selectQuestions, selectQuestionsParameter);


            List<Questions> questions = selectResultQuestions.ConvertDataTableToList<Questions>();


            foreach (Questions question in questions)
            {
                string selectAnswers = "SELECT * FROM Answer WHERE IdQuestion = @IdQuestion;";
                SqlParameter[] selectAnswerParameter = { new("@IdQuestion", question.Id) };

                DataTable selectResultAnswer = await _dbService.ExecuteQuery(selectAnswers, selectAnswerParameter);


                List<Answer> answers = selectResultAnswer.ConvertDataTableToList<Answer>();

                question.Answers = answers;
            }


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
            DataTable insertResult = await _dbService.ExecuteQuery(insertQuery, insertParameters);
            int idForm = Convert.ToInt32(insertResult.Rows[0]["Id"]);

            // insert question
            await _forEach.InsertForEach(forms, idForm);

            return await GetById(idForm);
        }


        // DELETE METHOD
        public async Task<Forms> Delete(int id)
        {
            Forms selectForms = await GetById(id);
            await _forEach.DeleteForEach(id);

            return selectForms;
        }

        // PUT METHOD
        public async Task<Forms> Update([FromBody] Forms form, int id)
        {
            string updateQuery = "UPDATE Forms SET IdGroup = @IdGroup, Title = @Title, Questions = @Questions WHERE Id = @Id;";

            SqlParameter[] updateParameters =
            {
                new("@IdGroup", form.IdGroup),
                new("@Title", form.Title.Trim()),
                new("@Question", form.Questions),
                new("@Id", id)
            };

            await _dbService.ExecuteQuery(updateQuery, updateParameters);

            return await GetById(id);
        }
    }
}
