using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using System.Data;

namespace MovtechForms.Domain.Interfaces.RepositoryInterfaces
{
    public interface IUserRepository
    {
        Task<DataTable> CreateUser([FromBody] User users);
        Task<DataTable> GetUser();
        Task UpdateUser(User users);
    }
}
