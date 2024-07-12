using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data.SqlClient;
using System.Data;

namespace MovtechForms.Application.Repositories.MainRepositories
{
    public class QuestionRepository : IRepository<Questions>
    {
        private readonly IDatabaseService _dbService;
        private readonly IForEach<Questions> _forEach;

        public QuestionRepository(IDatabaseService dbService, IForEach<Questions> each)
        {
            _dbService = dbService;
            _forEach = each;
        }

        public async Task<DataTable> Get()
        {
            string query = "SELECT * FROM Questions;";

            return await _dbService.ExecuteQueryAsync(query, null!);
        }

        public async Task<Questions> GetById(int id)
        {
            string query = "SELECT * FROM Questions WHERE Id = @Id;";
            SqlParameter[] parameter = { new("@Id", id) };
            DataTable selectOperation = await _dbService.ExecuteQueryAsync(query, parameter);

            List<Questions> questionsList = selectOperation.ConvertDataTableToList<Questions>();
            Questions questions = questionsList.Find(i => i.Id == id)!;

            string queryAnswer = "SELECT * FROM Answer WHERE IdQuestion = @IdQuestion;";
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

            await _forEach.InsertForEach(questions, questionId);

            return await GetById(questionId);
        }

        public async Task<Questions> Delete(int id)
        {
            await _forEach.DeleteForEach(id);

            string deleteQuery = "DELETE FROM Questions WHERE Id = @Id;";
            SqlParameter[] deleteParameter = { new("@Id", id) };

            await _dbService.ExecuteQueryAsync(deleteQuery, deleteParameter);

            return await GetById(id);
        }

        public async Task<Questions> Update([FromBody] Questions questions, int id)
        {
            string updateQuery = "UPDATE Questions SET IdForm = @IdForm, Content = @Content WHERE Id = @Id;";

            SqlParameter[] updateParameters =
            {
                new("@Id", id),
                new("@IdForm", questions.IdForm),
                new("@Content", questions.Content.Trim())
            };

            await _dbService.ExecuteQueryAsync(updateQuery, updateParameters);

            return await GetById(id);
        }
    }
}
