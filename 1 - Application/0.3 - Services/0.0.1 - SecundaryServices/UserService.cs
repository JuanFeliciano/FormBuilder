using Microsoft.AspNetCore.Mvc;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._2___HandlerInterfaces._0._0._0._1___SecundaryInterfaces;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces.ServicesInterfaces;

namespace MovtechForms.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserHandler _userhandler;

        public UserService(IUserHandler userRepo)
        {
            _userhandler = userRepo;
        }

        public async Task<Users> CreateUser([FromBody] Users user)
        {
            return await _userhandler.CreateUser(user);
        }

        public async Task<List<Users>> GetUser()
        {
            return await _userhandler.GetUser();
        }

        public async Task<(string, string, DateTime)> GetUserByRefreshToken(string refresh)
        {
            return await _userhandler.GetUserByRefreshToken(refresh);
        }
    }
}
