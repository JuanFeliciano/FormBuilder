using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;

namespace MovtechForms._2___Domain._0._2___Interfaces._0._0._2___HandlerInterfaces._0._0._0._1___SecundaryInterfaces
{
    public interface IUserHandler
    {
        Task<User> CreateUser([FromBody] User user);
        Task<List<User>> GetUser();
        Task<(string, string, DateTime)> GetUserByRefreshToken(string refresh);


    }
}
