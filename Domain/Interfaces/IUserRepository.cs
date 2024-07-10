using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using System.Data;

namespace MovtechForms.Domain.Interfaces
{
    public interface IUserRepository
    {
        Task<Users> CreateUser([FromBody] Users users);
        Task<DataTable> GetByUsername([FromBody] Users users);
    }
}
