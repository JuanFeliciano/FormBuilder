using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using MovtechForms.Domain.Interfaces.ServicesInterfaces;
using System.Data.SqlClient;

namespace MovtechForms.Application.Repositories.UseCases
{
    public class FormForEach : IForEach<Forms>
    {
        private readonly IDatabaseService _dbService;

        public FormForEach(IDatabaseService dbService) => _dbService = dbService;

        public async Task InsertForEach([FromBody] Forms forms, int idForm)
        {
            foreach (Questions questions in forms.Questions)
            {
                string insertQuestionsQuery = "INSERT INTO Questions (IdForm, Content) OUTPUT INSERTED.Id VALUES (@IdForm, @Content);";
                SqlParameter[] questionParameters =
                {
                    new("@IdForm", idForm),
                    new("@Content", questions.Content.Trim())
                };

                await _dbService.ExecuteQuery(insertQuestionsQuery, questionParameters);
            }
        }

        public async Task DeleteForEach(int idForm)
        {
            string deleteQuestionQuery = "DELETE FROM Questions WHERE IdForm = @IdForm;";
            SqlParameter[] deleteQuestionParameter = { new("@IdForm", idForm) };

            await _dbService.ExecuteQuery(deleteQuestionQuery, deleteQuestionParameter);

            string deleteFormQuery = "DELETE FROM Forms WHERE Id = @Id;";
            SqlParameter[] deleteFormParameter = { new("@Id", idForm) };

            await _dbService.ExecuteQuery(deleteFormQuery, deleteFormParameter);
        }
    }
}
