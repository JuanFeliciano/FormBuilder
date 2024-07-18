using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces.RepositoryInterfaces;
using MovtechForms.Domain.Models;
using System.Data;

namespace MovtechForms.Application.Repositories
{
    public class LoginRepository : ILoginRepository
    {
        private readonly IUserRepository _userRepository;

        public LoginRepository( IUserRepository userRepo)
        {
            _userRepository = userRepo;
        }

        public async Task<bool> ValidationLogin([FromBody] LoginModel login) 
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

    }
}
