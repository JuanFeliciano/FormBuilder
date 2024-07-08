using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data.SqlClient;

namespace MovtechForms.Application.Utilities.FormUtils
{
    public class FormForEach : IForEach<Forms>
    {
        private readonly IDatabaseService _dbService;

        public FormForEach(IDatabaseService dbService) => _dbService = dbService;

        public async Task SelectForEach([FromBody] Forms forms, int idForm)
        {
            foreach (Questions questions in forms.Questions)
            {
                string insertQuestionsQuery = "INSERT INTO Questions (IdForm, Content) OUTPUT INSERTED.Id VALUES (@IdForm, @Content);";
                SqlParameter[] questionParameters =
                {
                    new("@IdForm", idForm),
                    new("@Content", questions.Content.Trim())
                };
                await _dbService.ExecuteQueryAsync(insertQuestionsQuery, questionParameters);
            }
        }

        public async Task DeleteForEach(int idForm)
        {

        }
    }
}
