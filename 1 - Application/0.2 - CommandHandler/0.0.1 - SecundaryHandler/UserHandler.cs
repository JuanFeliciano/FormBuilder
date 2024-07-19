using Microsoft.AspNetCore.Mvc;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._2___HandlerInterfaces._0._0._0._1___SecundaryInterfaces;
using MovtechForms.Application;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces.RepositoryInterfaces;
using System.Data;

namespace MovtechForms._1___Application._0._2___CommandHandler._0._0._1___SecundaryHandler
{
    public class UserHandler : IUserHandler
    {
        private readonly IUserRepository _userRepository;

        public UserHandler(IUserRepository userRepo)
        {
            _userRepository = userRepo;
        }

        public async Task<Users> CreateUser([FromBody] Users userBody)
        {
            if (string.IsNullOrWhiteSpace(userBody.Name) || string.IsNullOrWhiteSpace(userBody.Password) || string.IsNullOrWhiteSpace(userBody.Role))
            {
                throw new Exception("The value cannot be null or empty");
            }

            if (userBody.Role is not "Admin")
            {
                userBody.Role = "Common";
            }

            DataTable users = await _userRepository.CreateUser(userBody);
            List<Users> userList = users.ConvertDataTableToList<Users>();

            Users user = userList.Find(i => i.Id == userBody.Id)!;


            return user;
        }

        public async Task<List<Users>> GetUser()
        {
            DataTable userDataTable = await _userRepository.GetUser();

            if (userDataTable is null || userDataTable.Rows.Count is 0)
            {
                throw new Exception("There are no users");
            }


            return userDataTable.ConvertDataTableToList<Users>();
        }
    }
}
