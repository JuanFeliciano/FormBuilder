using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data;
using System.Data.SqlClient;

namespace MovtechForms.Application.Repositories
{
    public class UserRepository : IUserRepository
    {
        private IDatabaseService _dbService;

        public UserRepository(IDatabaseService db) => _dbService = db;

        public async Task<DataTable> CreateUser([FromBody] Users userBody)
        {
            string query = "INSERT INTO Users (Name, Password, Role) OUTPUT INSERTED.Id VALUES (@Name, @Password, @Role);";
            SqlParameter[] userParameters =
            {
                new ("@Name", userBody.Name),
                new ("@Password", userBody.Password),
                new ("@Role", userBody.Role)
            };

            DataTable userCreated = await _dbService.ExecuteQueryAsync(query, userParameters);
            int idUser = Convert.ToInt32(userCreated.Rows[0]["Id"]);

            string selectQuery = "SELECT * FROM Users WHERE Id = @Id;";
            SqlParameter[] selectParameter = { new("@Id", idUser) };

            return await _dbService.ExecuteQueryAsync(selectQuery, selectParameter);
        }

        public async Task<DataTable> GetUser()
        {
            string query = "SELECT * FROM Users;";

            return await _dbService.ExecuteQueryAsync(query, null!);
        }
    }
}
