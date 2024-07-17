using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces.RepositoryInterfaces;
using MovtechForms.Domain.Interfaces.ServicesInterfaces;
using System.Data;

namespace MovtechForms.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepo)
        {
            _userRepository = userRepo;
        }

        public async Task<List<Users>> CreateUser([FromBody] Users user)
        {
            if (string.IsNullOrWhiteSpace(user.Name) || string.IsNullOrWhiteSpace(user.Password) || string.IsNullOrWhiteSpace(user.Role))
            {
                throw new Exception("The value cannot be null or empty");
            }

            DataTable users = await _userRepository.CreateUser(user);

            return users.ConvertDataTableToList<Users>();
        }

        public async Task<List<Users>> GetUser()
        {
            DataTable userDataTable = await _userRepository.GetUser();

            return userDataTable.ConvertDataTableToList<Users>();
        }
    }
}
