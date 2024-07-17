using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Models;

namespace MovtechForms.Domain.Interfaces.RepositoryInterfaces
{
    public interface ILoginRepository
    {
        Task<bool> ValidationLogin([FromBody] LoginModel login);
    }
}
