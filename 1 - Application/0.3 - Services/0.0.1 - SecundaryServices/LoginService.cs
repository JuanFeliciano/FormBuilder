using Microsoft.AspNetCore.Mvc;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._2___HandlerInterfaces._0._0._0._1___SecundaryInterfaces;
using MovtechForms.Domain.Interfaces.ServicesInterfaces;
using MovtechForms.Domain.Models;

namespace MovtechForms.Application.Services
{
    public class LoginService : ILoginService
    {
        private readonly ILoginHandler _loginHandler;

        public LoginService(ILoginHandler loginHandler) => _loginHandler = loginHandler;

        public async Task<string> ValidationLogin([FromBody] LoginModel login)
        {
            return await _loginHandler.ValidationLogin(login);
        }

    }
}
