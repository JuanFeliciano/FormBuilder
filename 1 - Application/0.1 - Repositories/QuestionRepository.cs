using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using System.Data.SqlClient;
using System.Data;
using MovtechForms.Domain.Interfaces.ServicesInterfaces;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._1___RepositoryInterfaces._0._0._0._1___CoreInterfaces;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._5___UsecasesInterfaces;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._4___DatabaseInterface;

namespace MovtechForms.Application.Repositories.MainRepositories
{
    public class QuestionRepository : IQuestionRepository
    {
        private readonly IDatabaseService _dbService;
        private readonly IQuestionForEach _forEach;
        private readonly IBulkService _bulkService;

        public QuestionRepository(IDatabaseService dbService, IQuestionForEach each, IBulkService bulk)
        {
            _dbService = dbService;
            _forEach = each;
            _bulkService = bulk;
        }

        public async Task<List<Question>> Get()
        {
            string query = "SELECT * FROM Questions;";

            DataTable questionDataTable = await _dbService.ExecuteQuery(query, null!);

            List<Question> questions = questionDataTable.ConvertDataTableToList<Question>();

            return questions;
        }

        public async Task<Question> GetById(int id)
        {
            string query = "SELECT * FROM Questions WHERE Id = @Id;";
            SqlParameter[] parameter = { new("@Id", id) };

            DataTable selectOperation = await _dbService.ExecuteQuery(query, parameter);

            List<Question> questionsList = selectOperation.ConvertDataTableToList<Question>();
            Question questions = questionsList.Find(i => i.Id == id)!;

            List<Answer> answerList = await _forEach.SelectForEach(id);

            questions.Answers = answerList;


            return questions;
        }

        public async Task<DataTable> GetByIdForm(int id)
        {
            string query = "SELECT * FROM Questions WHERE IdForm = @IdForm;";
            SqlParameter[] parameter = { new("@IdForm", id) };

            DataTable questionTable = await _dbService.ExecuteQuery(query, parameter);

            return questionTable;
        }

        public async Task<DataTable> Post([FromBody] Question[] questions)
        {
            await _bulkService.BulkInsertQuestions(questions);

            string query = $"SELECT TOP {questions.Count()} * FROM Questions ORDER BY id DESC;";

            DataTable select = await _dbService.ExecuteQuery(query, null!);

            return select;
        }

        public async Task<Question> Delete(int id)
        {
            Question questionSelect = await GetById(id);

            await _forEach.DeleteForEach(id);

            string deleteQuery = "DELETE FROM Questions WHERE Id = @Id;";
            SqlParameter[] deleteParameter = { new("@Id", id) };

            await _dbService.ExecuteQuery(deleteQuery, deleteParameter);

            return questionSelect;
        }

        public async Task<Question> Update([FromBody] Question questions, int id)
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
