using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using MovtechForms.Domain.Models;

namespace MovtechForms.Application.Services
{
    public class LoginService : ILoginService
    {
        private readonly ILoginRepository _lgRepository;
        private readonly TokenService _tokenService;

        public LoginService(ILoginRepository lg, TokenService tk)
        {
            _lgRepository = lg;
            _tokenService = tk;
        }

        public async Task<string> ValidationLogin([FromBody] LoginModel login)
        {
            bool result = await _lgRepository.ValidationLogin(login);

            if (result)
            {
                var admin = new Users { Name = login.Username, Role = "Admin" };
                var tokenAdmin = _tokenService.GenerateToken(admin);
                return tokenAdmin;
            }

            var common = new Users { Name = login.Username, Role = "Common" };
            var token = _tokenService.GenerateToken(common);

            return token;
        }

    }
}
