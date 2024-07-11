using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Models;

namespace MovtechForms.Domain.Interfaces
{
    public interface ILoginRepository
    {
        Task<bool> ValidationLogin([FromBody] LoginModel login );
    }
}
