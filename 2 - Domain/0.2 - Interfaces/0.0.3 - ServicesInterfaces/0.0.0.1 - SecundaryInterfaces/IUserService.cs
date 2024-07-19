using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;

namespace MovtechForms.Domain.Interfaces.ServicesInterfaces
{
    public interface IUserService
    {
        Task<Users> CreateUser([FromBody] Users users);
        Task<List<Users>> GetUser();
    }
}
