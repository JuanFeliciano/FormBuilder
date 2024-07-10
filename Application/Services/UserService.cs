using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data;

namespace MovtechForms.Application.Services
{
    public class UserService : IUserService 
    {
        private readonly IDatabaseService _dbService;
        private readonly IUserRepository _userRepository;

        public UserService(IDatabaseService db, IUserRepository userRepo)
        {
            _dbService = db;
            _userRepository = userRepo;
        }

        public async Task<Users> CreateUser([FromBody] Users user)
        {
            if (string.IsNullOrWhiteSpace(user.Name) || string.IsNullOrWhiteSpace(user.Password) || string.IsNullOrWhiteSpace(user.Role))
            {
                throw new Exception("The value cannot be null or empty");
            }

            Users users = await _userRepository.CreateUser(user);

            return users;
        }

        public async Task<List<Users>> GetByUsername([FromBody] Users user)
        {
            DataTable userDataTable = await _userRepository.GetByUsername(user);
            List<Users> users = userDataTable.ConvertDataTableToList<Users>();

            return users;
        }
    }
}
