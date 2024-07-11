using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Models;

namespace MovtechForms.Domain.Interfaces
{
    public interface ILoginService
    {
        Task<string> ValidationLogin([FromBody] LoginModel login);
    }
}
