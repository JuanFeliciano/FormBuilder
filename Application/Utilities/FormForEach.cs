using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data;
using System.Data.SqlClient;

namespace MovtechForms.Application.Utilities
{
    public class FormForEach : IForEach<Forms>
    {
        private readonly IDatabaseService _dbService;

        public FormForEach(IDatabaseService dbService) => _dbService = dbService;

        public async Task ForEach([FromBody] Forms forms, int idForm)
        {

            if (forms.Questions == null || forms.Questions.Count == 0)
            {
                throw new Exception("You must add at least one question");
            }

            foreach (Questions questions in forms.Questions)
            {
                string questionQuery = "INSERT INTO Questions (IdForm, Content) VALUES (@IdForm, @Content);";
                SqlParameter[] questionParameters =
                {
                    new("@IdForm", idForm),
                    new("@Content", questions.Content)
                };

                await _dbService.ExecuteQueryAsync(questionQuery, questionParameters);
            }
        }
    }
}
