using Microsoft.AspNetCore.Mvc;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._2___HandlerInterfaces._0._0._0._1___SecundaryInterfaces;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._6___TokenInterfaces;
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
        private readonly ITokenConfigure _tokenService;

        public LoginHandler(IUserRepository userRepo, ITokenConfigure tokenRevocation)
        {
            _userRepository = userRepo;
            _tokenService = tokenRevocation;
        }

        public async Task<(string, string)> Login([FromBody] LoginModel login)
        {
            DataTable userDataTable = await _userRepository.GetUser();
            List<Users> users = userDataTable.ConvertDataTableToList<Users>();

            Users matchingUser = users.Find(i => i.Name == login.Username && i.Password == login.Password)!;

            if (matchingUser is null)
                throw new Exception("No user was found with these predicates");

            if (matchingUser.Role == "Admin")
            {
                var admin = new Users { Name = login.Username, Role = "Admin", Id = matchingUser.Id };
                return await _tokenService.GenerateToken(admin);
            }

            var common = new Users { Name = login.Username, Role = "Common", Id = matchingUser.Id };

            return await _tokenService.GenerateToken(common);

        }
    }
}
