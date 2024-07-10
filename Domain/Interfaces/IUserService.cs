using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;

namespace MovtechForms.Domain.Interfaces
{
    public interface IUserService
    {
        Task<Users> CreateUser([FromBody] Users users);
        Task<List<Users>> GetByUsername([FromBody] Users users);
    }
}
