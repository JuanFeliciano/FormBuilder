using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data.SqlClient;
using System.Data;

namespace MovtechForms.Application.Repositories
{
    public class QuestionRepository : IRepository<Questions>
    {
        private readonly IDatabaseService _dbService;

        public QuestionRepository(IDatabaseService dbService) => _dbService = dbService;

        public async Task<DataTable> Get()
        {
            string query = "SELECT * FROM Questions;";
            DataTable selectOperation = await _dbService.ExecuteQueryAsync(query, null!);

            return selectOperation;
        }

        public async Task<Questions> GetById(int id)
        {
            string query = "SELECT * FROM Questions WHERE Id = @Id;";
            SqlParameter[] parameter = { new("@Id", id) };
            DataTable selectOperation = await _dbService.ExecuteQueryAsync(query, parameter);

            List<Questions> questionsList = selectOperation.ConvertDataTableToList<Questions>();
            Questions questions = questionsList.Find(i => i.Id == id)!;

            string queryAnswer = "SELECT * FROM Answer WHERE IdQuestion = @Id;";
            SqlParameter[] answerParameter = { new("@IdQuestion", id) };
            DataTable selectAnswerOperation = await _dbService.ExecuteQueryAsync(queryAnswer, answerParameter);
            List<Answer> answerList = selectAnswerOperation.ConvertDataTableToList<Answer>();

            questions.Answers = answerList;


            return questions;
        }

        public async Task<Questions> Post([FromBody] Questions questions)
        {
            string insertQuery = "INSERT INTO Questions (IdForm, Content) OUTPUT INSERTED.Id VALUES (@IdForm, @Content)";

            SqlParameter[] insertParameters =
            {
                new("@IdForm", questions.IdForm),
                new("@Content", questions.Content.Trim())
            };

            DataTable insertResult = await _dbService.ExecuteQueryAsync(insertQuery, insertParameters);

            int questionId = Convert.ToInt32(insertResult.Rows[0]["Id"]);

            Questions selectQuestions = await GetById(questionId);

            return selectQuestions;
        }

        public async Task<Questions> Delete(int id)
        {
            string deleteQuery = "DELETE FROM Questions WHERE Id = @Id;";
            SqlParameter[] deleteParameter = { new("@Id", id) };
            
            await _dbService.ExecuteQueryAsync(deleteQuery, deleteParameter);

            Questions selectQuestions = await GetById(id);

            return selectQuestions;
        }

        public async Task<Questions> Update([FromBody] Questions questions, int id)
        {
            string updateQuery = "UPDATE Questions SET IdForm = @IdForm, Content = @Content WHERE Id = @Id;";

            SqlParameter[] updateParameters =
            {
                new("@IdGroup", questions.IdForm),
                new("@Title", questions.Content.Trim()),
                new("@Id", id)
            };

            await _dbService.ExecuteQueryAsync(updateQuery, updateParameters);

            Questions selectQuestions = await GetById(id);

            return selectQuestions;
        }
    }
}
