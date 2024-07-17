using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using System.Data;

namespace MovtechForms.Domain.Interfaces.ServicesInterfaces
{
    public interface IUserService
    {
        Task<List<Users>> CreateUser([FromBody] Users users);
        Task<List<Users>> GetUser();
    }
}
