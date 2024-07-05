using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data;
using System.Data.SqlClient;

namespace MovtechForms.Application.Utilities.FormGroupUtils
{
    public class FormGroupForEach : IForEach<FormsGroup>
    {
        private readonly IDatabaseService _dbService;

        public FormGroupForEach(IDatabaseService databaseService) => _dbService = databaseService;

        public async Task ForEach([FromBody] FormsGroup formsGroup, int idFormGroup)
        {

            if (formsGroup.Forms == null || formsGroup.Forms.Count == 0)
            {
                throw new ArgumentException("É necessário passar ao menos um formulário.");
            }

            foreach (Forms forms in formsGroup.Forms)
            {
                string insertFormQuery = "INSERT INTO Forms (IdGroup, Title) OUTPUT INSERTED.Id VALUES (@IdGroup, @Title);";
                SqlParameter[] formParameters =
                {
                    new("@IdGroup", idFormGroup),
                    new("@Title", forms.Title.Trim())
                };

                DataTable formsAdded = await _dbService.ExecuteQueryAsync(insertFormQuery, formParameters);
                int idForm = Convert.ToInt32(formsAdded.Rows[0]["Id"]);


                if (forms.Questions == null || forms.Questions.Count == 0)
                {
                    throw new ArgumentException("É necessário passar ao menos uma pergunta para cada formulário.");
                }

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
        }
    }
}
