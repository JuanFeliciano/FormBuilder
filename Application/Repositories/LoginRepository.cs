using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using MovtechForms.Domain.Models;
using System.Data;
using System.Data.SqlClient;

namespace MovtechForms.Application.Repositories
{
    public class LoginRepository : ILoginRepository
    {
        private readonly IDatabaseService _dbService;

        public LoginRepository(IDatabaseService db) => _dbService = db;

        public async Task<bool> ValidationLogin([FromBody] LoginModel login) 
        {
            string query = "SELECT * FROM Users;";
            DataTable selectUsers = await _dbService.ExecuteQueryAsync(query, null!);

            List<Users> users = selectUsers.ConvertDataTableToList<Users>();

            Users matchingUser = users.Find(i => i.Name == login.Username && i.Password == login.Password)!;

            if (matchingUser is null)
                throw new Exception("No user was found with these predicates");

            if (matchingUser.Role == "Admin")
                return true;

            return false;
        }

    }
}
