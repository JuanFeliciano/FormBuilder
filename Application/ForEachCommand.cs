using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data.SqlClient;

namespace MovtechForms.Application
{
    public class ForEachCommand
    {
        private readonly IDatabaseService _dbService;

        public ForEachCommand(IDatabaseService databaseService) => _dbService = databaseService;
        
        public async void ForEach([FromBody] FormsGroup formsGroup)
        {
            foreach (Forms forms in formsGroup.Forms!)
            {
                string insertFormQuery = "INSERT INTO Forms (IdGroup, Title) VALUES (@IdGroup, @Title);";
                SqlParameter[] formParameters =
                {
                        new("@IdGroup", forms.IdGroup),
                        new("@Title", forms.Title)
                    };

                await _dbService.ExecuteQueryAsync(insertFormQuery, formParameters);

                foreach (Questions questions in forms.Questions!)
                {
                    string insertQuestionsQuery = "INSERT INTO Questions (IdForm, Content) VALUES (@IdForm, @Content);";
                    SqlParameter[] questionParameters =
                    {
                        new("@IdForm", questions.IdForm),
                        new("@Content", questions.Content)
                    };
                    await _dbService.ExecuteQueryAsync(insertQuestionsQuery, questionParameters);
                }
            }
        }
    }
}
