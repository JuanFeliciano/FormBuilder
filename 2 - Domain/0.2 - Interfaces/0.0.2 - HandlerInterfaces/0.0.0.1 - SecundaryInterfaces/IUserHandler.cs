using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;

namespace MovtechForms._2___Domain._0._2___Interfaces._0._0._2___HandlerInterfaces._0._0._0._1___SecundaryInterfaces
{
    public interface IUserHandler
    {
        Task<Users> CreateUser([FromBody] Users user);
        Task<List<Users>> GetUser();

    }
}
