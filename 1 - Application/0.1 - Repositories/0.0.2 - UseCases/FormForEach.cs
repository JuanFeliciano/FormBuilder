using Microsoft.AspNetCore.Mvc;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._5___UsecasesInterfaces;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces.ServicesInterfaces;
using System.Data;
using System.Data.SqlClient;

namespace MovtechForms.Application.Repositories.UseCases
{
    public class FormForEach : IFormForEach
    {
        private readonly IDatabaseService _dbService;

        public FormForEach(IDatabaseService dbService) => _dbService = dbService;

        public async Task<List<Question>> SelectForEach(int id)
        {
            string selectQuestions = "SELECT * FROM Questions WHERE IdForm = @IdForm;";
            SqlParameter[] selectQuestionsParameter = { new SqlParameter("@IdForm", id) };
            DataTable selectResultQuestions = await _dbService.ExecuteQuery(selectQuestions, selectQuestionsParameter);


            List<Question> questionList = selectResultQuestions.ConvertDataTableToList<Question>();


            foreach (Question question in questionList)
            {
                string selectAnswers = "SELECT * FROM Answer WHERE IdQuestion = @IdQuestion;";
                SqlParameter[] selectAnswerParameter = { new("@IdQuestion", question.Id) };

                DataTable selectResultAnswer = await _dbService.ExecuteQuery(selectAnswers, selectAnswerParameter);


                List<Answer> answers = selectResultAnswer.ConvertDataTableToList<Answer>();

                question.Answers = answers;
            }

            return questionList;
        }


        public async Task InsertForEach([FromBody] Form forms, int idForm)
        {
            foreach (Question questions in forms.Questions)
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
