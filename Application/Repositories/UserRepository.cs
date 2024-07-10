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

        public async Task<Users> CreateUser([FromBody] Users userBody)
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
            List<Users> listUsers = userCreated.ConvertDataTableToList<Users>();

            Users user = listUsers.Find(i => i.Id == idUser)!;

            return user;
        }

        public async Task<DataTable> GetByUsername([FromBody] Users users)
        {
            string query = "SELECT * FROM Users WHERE Name = @Name;";
            SqlParameter[] userParameter =
            {
                new ("@Name", users.Name)
            };

            DataTable selectUsers = await _dbService.ExecuteQueryAsync(query, userParameter);

            return selectUsers;
        }
    }
}
