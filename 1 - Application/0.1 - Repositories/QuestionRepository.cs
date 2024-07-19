using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data.SqlClient;
using System.Data;
using MovtechForms.Domain.Interfaces.ServicesInterfaces;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._1___RepositoryInterfaces._0._0._0._1___CoreInterfaces;

namespace MovtechForms.Application.Repositories.MainRepositories
{
    public class QuestionRepository : IQuestionRepository
    {
        private readonly IDatabaseService _dbService;
        private readonly IForEach<Questions> _forEach;

        public QuestionRepository(IDatabaseService dbService, IForEach<Questions> each)
        {
            _dbService = dbService;
            _forEach = each;
        }

        public async Task<List<Questions>> Get()
        {
            string query = "SELECT * FROM Questions;";

            DataTable questionDataTable = await _dbService.ExecuteQuery(query, null!);

            List<Questions> questions = questionDataTable.ConvertDataTableToList<Questions>();

            return questions;
        }

        public async Task<Questions> GetById(int id)
        {
            string query = "SELECT * FROM Questions WHERE Id = @Id;";
            SqlParameter[] parameter = { new("@Id", id) };

            DataTable selectOperation = await _dbService.ExecuteQuery(query, parameter);

            List<Questions> questionsList = selectOperation.ConvertDataTableToList<Questions>();
            Questions questions = questionsList.Find(i => i.Id == id)!;

            string queryAnswer = "SELECT * FROM Answer WHERE IdQuestion = @IdQuestion;";
            SqlParameter[] answerParameter = { new("@IdQuestion", id) };

            DataTable selectAnswerOperation = await _dbService.ExecuteQuery(queryAnswer, answerParameter);

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

            DataTable insertResult = await _dbService.ExecuteQuery(insertQuery, insertParameters);

            int questionId = Convert.ToInt32(insertResult.Rows[0]["Id"]);

            await _forEach.InsertForEach(questions, questionId);

            return await GetById(questionId);
        }

        public async Task<Questions> Delete(int id)
        {
            Questions questionSelect = await GetById(id);

            await _forEach.DeleteForEach(id);

            string deleteQuery = "DELETE FROM Questions WHERE Id = @Id;";
            SqlParameter[] deleteParameter = { new("@Id", id) };

            await _dbService.ExecuteQuery(deleteQuery, deleteParameter);

            return questionSelect;
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

            await _dbService.ExecuteQuery(updateQuery, updateParameters);

            return await GetById(id);
        }
    }
}
