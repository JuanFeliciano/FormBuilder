using Microsoft.AspNetCore.Mvc;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._4___DatabaseInterface;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces.RepositoryInterfaces;
using MovtechForms.Domain.Interfaces.ServicesInterfaces;
using System.Data;
using System.Data.SqlClient;

namespace MovtechForms.Application.Repositories.MainRepositories
{
    public class AnswerRepository : IAnswerRepository
    {
        private readonly IDatabaseService _dbService;
        private readonly IBulkService _bulkService;

        public AnswerRepository(IDatabaseService db, IBulkService bulk)
        {
            _dbService = db;
            _bulkService = bulk;
        }

        public async Task<DataTable> PostAnswer([FromBody] Answer[] answer)
        {
            await _bulkService.BulkInsert(answer);

            string query = $"SELECT TOP {answer.Count()} * FROM Answer ORDER BY id DESC;";

            DataTable select = await _dbService.ExecuteQuery(query, null!);

            return select;
        }

        public async Task<DataTable> GetAnswer()
        {
            string query = "SELECT * FROM Answer;";

            return await _dbService.ExecuteQuery(query, null!);
        }

        public async Task<DataTable> GetSingleAnswer(int idAnswer)
        {
            string query = "SELECT * FROM Answer WHERE Id = @Id;";
            SqlParameter[] parameter = { new("@Id", idAnswer) };

            return await _dbService.ExecuteQuery(query, parameter);
        }
    }
}
