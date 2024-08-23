using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Models;

namespace MovtechForms.Domain.Interfaces.ServicesInterfaces
{
    public interface ILoginService
    {
        Task<(string, string, string)> ValidationLogin([FromBody] LoginModel login);
    }
}
