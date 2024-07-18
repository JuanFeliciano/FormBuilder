using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Models;

namespace MovtechForms.Domain.Interfaces.ServicesInterfaces
{
    public interface ILoginService
    {
        Task<string> ValidationLogin([FromBody] LoginModel login);
    }
}
