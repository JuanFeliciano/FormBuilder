using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;

namespace MovtechForms.Domain.Interfaces.ServicesInterfaces
{
    public interface IUserService
    {
        Task<User> CreateUser([FromBody] User users);
        Task<List<User>> GetUser();
        Task<(string, string, DateTime)> GetUserByRefreshToken(string request);
    }
}
