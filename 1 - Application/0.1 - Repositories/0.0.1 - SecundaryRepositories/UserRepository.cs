using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces.RepositoryInterfaces;
using MovtechForms.Domain.Interfaces.ServicesInterfaces;
using System.Data;
using System.Data.SqlClient;

namespace MovtechForms.Application.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IDatabaseService _dbService;

        public UserRepository(IDatabaseService db)
        {
            _dbService = db;
        }

        public async Task<DataTable> CreateUser([FromBody] Users userBody)
        {

            string query = "INSERT INTO Users (Name, Password, Role) OUTPUT INSERTED.Id VALUES (@Name, @Password, @Role);";


            SqlParameter[] userParameters =
            {
                new ("@Name", userBody.Name),
                new ("@Password", userBody.Password),
                new ("@Role", userBody.Role)
            };

            DataTable userCreated = await _dbService.ExecuteQuery(query, userParameters);
            int idUser = Convert.ToInt32(userCreated.Rows[0]["Id"]);

            string selectQuery = "SELECT * FROM Users WHERE Id = @Id;";
            SqlParameter[] selectParameter = { new("@Id", idUser) };

            return await _dbService.ExecuteQuery(selectQuery, selectParameter);
        }

        public async Task<DataTable> GetUser()
        {
            string query = "SELECT * FROM Users;";

            return await _dbService.ExecuteQuery(query, null!);
        }

        public async Task UpdateUser(Users user)
        {
            string command = "UPDATE Users SET RefreshToken = @RefreshToken, RefreshTokenExpiryTime = @RefreshTokenExpiryTime WHERE Id = @Id;";
            SqlParameter[] parameters =
            {
                new ("@RefreshToken", user.RefreshToken),
                new ("@RefreshTokenExpiryTime", user.RefreshTokenExpiryTime),
                new ("@Id", user.Id)
            };

            await _dbService.ExecuteQuery(command, parameters);
        }
    }
}
