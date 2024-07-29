using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using MovtechForms.Domain.Interfaces.ServicesInterfaces;
using System.Data;
using System.Data.SqlClient;

namespace MovtechForms.Application.Repositories.UseCases
{
    public class FormGroupForEach : IFormGroupForEach
    {
        private readonly IDatabaseService _dbService;

        public FormGroupForEach(IDatabaseService databaseService) => _dbService = databaseService;


        public async Task<List<Forms>> SelectForEach(int id)
        {
            string queryForms = "SELECT * FROM Forms WHERE IdGroup = @IdGroup;";
            SqlParameter[] formParameter = { new("@IdGroup", id) };
            DataTable selectFormOperation = await _dbService.ExecuteQuery(queryForms, formParameter);

            List<Forms> formsList = selectFormOperation.ConvertDataTableToList<Forms>();

            foreach (Forms form in formsList)
            {
                string queryQuestion = "SELECT * FROM Questions WHERE IdForm = @IdForm;";
                SqlParameter[] questionParameter = { new("@IdForm", form.Id) };
                DataTable selectQuestionOperation = await _dbService.ExecuteQuery(queryQuestion, questionParameter);

                List<Questions> questionList = selectQuestionOperation.ConvertDataTableToList<Questions>();

                foreach (Questions question in questionList)
                {
                    string queryAnswer = "SELECT * FROM Answer WHERE IdQuestion = @IdQuestion;";
                    SqlParameter[] answerParameter = { new("@IdQuestion", question.Id) };
                    DataTable selectAnswerOperation = await _dbService.ExecuteQuery(queryAnswer, answerParameter);

                    List<Answer> answerList = selectAnswerOperation.ConvertDataTableToList<Answer>();

                    question.Answers = answerList;
                }

                form.Questions = questionList;
            }

            return formsList;
        }


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
                    throw new Exception("The value Question cannot be null or empty");
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
            string selectForm = "SELECT * FROM Forms WHERE IdGroup = @IdGroup;";
            SqlParameter[] selectFormParameter = { new("@IdGroup", idFormGroup) };

            DataTable formSelect = await _dbService.ExecuteQuery(selectForm, selectFormParameter);
            List<Forms> formList = formSelect.ConvertDataTableToList<Forms>();

            foreach (Forms form in formList)
            {
                string selectQuestion = "SELECT * FROM Questions WHERE IdForm = @IdForm;";
                SqlParameter[] questionParameter = { new("@IdForm", form.Id) };


                DataTable questionSelect = await _dbService.ExecuteQuery(selectQuestion, questionParameter);
                List<Questions> questionList = questionSelect.ConvertDataTableToList<Questions>();

                foreach (Questions question in questionList)
                {
                    string queryAnswer = "DELETE FROM Answer WHERE IdQuestion = @IdQuestion;";
                    SqlParameter[] answerParameter = { new("@IdQuestion", question.Id) };
                    await _dbService.ExecuteQuery(queryAnswer, answerParameter);
                }

                string queryDeleteQuestion = "DELETE FROM Questions WHERE IdForm = @IdForm;";
                SqlParameter[] questionDeleteParameter = { new("@IdForm", form.Id) };

                await _dbService.ExecuteQuery(queryDeleteQuestion, questionDeleteParameter);

            }

            string queryForms = "DELETE FROM Forms WHERE IdGroup = @IdGroup;";
            SqlParameter[] formParameter = { new("@IdGroup", idFormGroup) };

            await _dbService.ExecuteQuery(queryForms, formParameter);
        }
    }
}
