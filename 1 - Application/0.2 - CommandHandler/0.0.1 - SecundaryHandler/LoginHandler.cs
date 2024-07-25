using Microsoft.AspNetCore.Mvc;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._2___HandlerInterfaces._0._0._0._1___SecundaryInterfaces;
using MovtechForms.Application;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces.RepositoryInterfaces;
using MovtechForms.Domain.Models;
using System.Data;

namespace MovtechForms._1___Application._0._2___CommandHandler._0._0._1___SecundaryHandler
{
    public class LoginHandler : ILoginHandler
    {
        private readonly IUserRepository _userRepository;
        private readonly TokenHandler _tokenService;

        public LoginHandler(IUserRepository userRepo, TokenHandler tokenService)
        {
            _userRepository = userRepo;
            _tokenService = tokenService;
        }

        public async Task<bool> GetLogin([FromBody] LoginModel login)
        {
            DataTable userDataTable = await _userRepository.GetUser();
            List<Users> users = userDataTable.ConvertDataTableToList<Users>();

            Users matchingUser = users.Find(i => i.Name == login.Username && i.Password == login.Password)!;

            if (matchingUser is null)
                throw new Exception("No user was found with these predicates");

            if (matchingUser.Role == "Admin")
                return true;

            return false;
        }

        public async Task<string> ValidationLogin([FromBody] LoginModel login)
        {
            bool result = await GetLogin(login);

            if (result)
            {
                var admin = new Users { Name = login.Username, Role = "Admin" };

                return _tokenService.GenerateToken(admin);
            }

            var common = new Users { Name = login.Username, Role = "Common" };

            return _tokenService.GenerateToken(common);
        }
    }
}
