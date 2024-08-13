using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Models;

namespace MovtechForms._2___Domain._0._2___Interfaces._0._0._2___HandlerInterfaces._0._0._0._1___SecundaryInterfaces
{
    public interface ILoginHandler
    {
        Task<(string, string, string)> Login([FromBody] LoginModel login);
    }
}
