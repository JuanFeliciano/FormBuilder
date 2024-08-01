using Microsoft.AspNetCore.Mvc;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._2___HandlerInterfaces._0._0._0._1___SecundaryInterfaces;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._6___TokenInterfaces;
using MovtechForms._2___Domain._0._3___Models;
using MovtechForms.Application;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces.RepositoryInterfaces;
using System.Data;

namespace MovtechForms._1___Application._0._2___CommandHandler._0._0._1___SecundaryHandler
{
    public class UserHandler : IUserHandler
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenConfigure _tokenConfigure;

        public UserHandler(IUserRepository userRepo, ITokenConfigure tokenConfigure)
        {
            _userRepository = userRepo;
            _tokenConfigure = tokenConfigure;
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

        public async Task<(string, DateTime)> GetUserByRefreshToken(string refresh)
        {
            if (refresh is null || string.IsNullOrEmpty(refresh))
                throw new Exception("Invalid client request");


            DataTable userdataTable = await _userRepository.GetUser();

            if (userdataTable is null || userdataTable.Rows.Count <= 0)
                throw new Exception("No users found");


            List<Users> userList = userdataTable.ConvertDataTableToList<Users>();


            Users user = userList.Find(i => i.RefreshToken == refresh)!;


            if (user is null || user.RefreshTokenExpiryTime <= DateTime.Now)
                throw new Exception("Invalid refresh token");


            var newAcessToken = _tokenConfigure.GenerateToken(user);
            var newRefreshToken = _tokenConfigure.GenerateRefreshToken();


            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiryTime = DateTime.Now.AddHours(5);


            await _userRepository.UpdateUser(user);

            return (user.RefreshToken, user.RefreshTokenExpiryTime);
        }
    }
}
