using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data;
using System.Data.SqlClient;

namespace MovtechForms.Application.Utilities
{
    public class FormGroupForEach : IForEach<FormsGroup>
    {
        private readonly IDatabaseService _dbService;

        public FormGroupForEach(IDatabaseService databaseService) => _dbService = databaseService;

        public async Task SelectForEach([FromBody] FormsGroup formsGroup, int idFormGroup)
        {

            foreach (Forms forms in formsGroup.Forms!)
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

        public async Task DeleteForEach(int idFormGroup)
        {
            // Seleciona os formulários associados ao grupo
            string selectForm = "SELECT * FROM Forms WHERE IdGroup = @IdGroup;";
            SqlParameter[] selectFormParameter = { new("@IdGroup", idFormGroup) };

            DataTable formSelect = await _dbService.ExecuteQueryAsync(selectForm, selectFormParameter);
            List<Forms> formList = formSelect.ConvertDataTableToList<Forms>();

            if (formList.Count == 0)
            {
                throw new Exception($"No forms found with Group Id: {idFormGroup}");
            }

            foreach (Forms form in formList)
            {
                // Deleta perguntas associadas ao formulário
                string queryQuestion = "DELETE FROM Questions WHERE IdForm = @IdForm;";
                SqlParameter[] questionParameter = { new("@IdForm", form.Id) };
                await _dbService.ExecuteQueryAsync(queryQuestion, questionParameter);
            }

            // Deleta formulários associados ao grupo
            string queryForms = "DELETE FROM Forms WHERE IdGroup = @IdGroup;";
            SqlParameter[] formParameter = { new("@IdGroup", idFormGroup) };
            await _dbService.ExecuteQueryAsync(queryForms, formParameter);

            // Deleta o grupo de formulários
            string queryFormGroup = "DELETE FROM FormsGroup WHERE Id = @Id;";
            SqlParameter[] formGroupParameter = { new("@Id", idFormGroup) };
            await _dbService.ExecuteQueryAsync(queryFormGroup, formGroupParameter);

        }

    }
}
