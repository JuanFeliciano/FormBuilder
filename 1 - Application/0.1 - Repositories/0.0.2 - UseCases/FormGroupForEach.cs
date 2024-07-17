using Microsoft.AspNetCore.Mvc;
using Microsoft.SqlServer.Server;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using MovtechForms.Domain.Interfaces.ServicesInterfaces;
using System.Data;
using System.Data.SqlClient;

namespace MovtechForms.Application.Repositories.UseCases
{
    public class FormGroupForEach : IForEach<FormsGroup>
    {
        private readonly IDatabaseService _dbService;

        public FormGroupForEach(IDatabaseService databaseService) => _dbService = databaseService;

        public async Task InsertForEach([FromBody] FormsGroup formsGroup, int idFormGroup)
        {
            foreach (Forms forms in formsGroup.Forms!)
            {
                string insertFormQuery = "INSERT INTO Forms (IdGroup, Title) OUTPUT INSERTED.Id VALUES (@IdGroup, @Title);";
                SqlParameter[] formParameters =
                {
                    new("@IdGroup", idFormGroup),
                    new("@Title", forms.Title.Trim())
                };

                DataTable formsAdded = await _dbService.ExecuteQuery(insertFormQuery, formParameters);

                int idForm = Convert.ToInt32(formsAdded.Rows[0]["Id"]);


                if (forms.Questions == null || forms.Questions.Count == 0)
                {
                    throw new ArgumentException("The value Question cannot be null or empty");
                }

                foreach (Questions questions in forms.Questions)
                {
                    string insertQuestionsQuery = "INSERT INTO Questions (IdForm, Content) VALUES (@IdForm, @Content);";
                    SqlParameter[] questionParameters =
                    {
                        new("@IdForm", idForm),
                        new("@Content", questions.Content.Trim())
                    };

                    await _dbService.ExecuteQuery(insertQuestionsQuery, questionParameters);
                }
            }
        }

        public async Task DeleteForEach(int idFormGroup)
        {
            // Seleciona os formulários associados ao grupo
            string selectForm = "SELECT * FROM Forms WHERE IdGroup = @IdGroup;";
            SqlParameter[] selectFormParameter = { new("@IdGroup", idFormGroup) };

            DataTable formSelect = await _dbService.ExecuteQuery(selectForm, selectFormParameter);
            List<Forms> formList = formSelect.ConvertDataTableToList<Forms>();

            foreach (Forms form in formList)
            {
                // Deleta perguntas associadas ao formulário
                string queryQuestion = "DELETE FROM Questions WHERE IdForm = @IdForm;";
                SqlParameter[] questionParameter = { new("@IdForm", form.Id) };

                await _dbService.ExecuteQuery(queryQuestion, questionParameter);

                string queryForms = "DELETE FROM Forms WHERE IdGroup = @IdGroup;";
                SqlParameter[] formParameter = { new("@IdGroup", idFormGroup) };

                await _dbService.ExecuteQuery(queryForms, formParameter);
            }

            // Deleta formulários associados ao grupo
        }
    }
}
