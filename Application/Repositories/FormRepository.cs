using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data.SqlClient;
using System.Data;

namespace MovtechForms.Application.Repositories
{
    public class FormRepository
    {
        private readonly IDatabaseService _dbService;

        public FormRepository(IDatabaseService dbService) => _dbService = dbService;

        // GET METHOD
        public async Task<DataTable> Get()
        {
            string query = "SELECT * FROM Forms;";
            DataTable result = await _dbService.ExecuteQueryAsync(query, null!);
            return result;

        }

        // POST METHOD
        public async Task<DataTable> Post([FromBody] Forms form)
        {
            string insertFormQuery = "INSERT INTO Forms (Title, IdGroup) OUTPUT INSERTED.Id VALUES (@Title, @IdGroup);";

            if (string.IsNullOrWhiteSpace(form.Title))
            {
                throw new Exception("The value cannot be null or empty");
            }

            SqlParameter[] formParameters = {
        new("@Title", form.Title.Trim()),
        new("@IdGroup", form.IdGroup)
    };

            DataTable formResult = await _dbService.ExecuteQueryAsync(insertFormQuery, formParameters);
            int newFormId = Convert.ToInt32(formResult.Rows[0]["Id"]);

            if (form.Questions != null && form.Questions.Any())
            {
                foreach (var question in form.Questions)
                {
                    string insertQuestionQuery = "INSERT INTO Questions (IdForm, Content) VALUES (@IdForm, @Content);";

                    SqlParameter[] questionParameters = {
                new("@IdForm", newFormId),
                new("@Content", question.Content.Trim())
            };

                    await _dbService.ExecuteQueryAsync(insertQuestionQuery, questionParameters);
                }
            }

            string selectQuery = "SELECT * FROM Forms WHERE Id = @Id;";
            SqlParameter[] selectParameters = { new("@Id", newFormId) };

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

            SqlParameter[] selectParameter =
            {
                new("@Id", id)
            };


            await _dbService.ExecuteQueryAsync(updateQuery, updateParameters);

            DataTable result = await _dbService.ExecuteQueryAsync(selectQuery, selectParameter);

            return result;
        }
    }
}
