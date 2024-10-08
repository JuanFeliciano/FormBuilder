using Microsoft.AspNetCore.Mvc;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._2___HandlerInterfaces._0._0._0._1___SecundaryInterfaces;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._6___TokenInterfaces;
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
        private readonly IHttpContextAccessor _context;

        public UserHandler(IUserRepository userRepo, ITokenConfigure tokenConfigure, IHttpContextAccessor context)
        {
            _userRepository = userRepo;
            _tokenConfigure = tokenConfigure;
            _context = context;
        }

        public async Task<User> CreateUser([FromBody] User userBody)
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

            int idUser = Convert.ToInt32(users.Rows[0]["Id"]);

            List<User> userList = users.ConvertDataTableToList<User>();

            User user = userList.Find(i => i.Id == idUser)!;


            return user;
        }

        public async Task<List<User>> GetUser()
        {
            DataTable userDataTable = await _userRepository.GetUser();

            if (userDataTable is null || userDataTable.Rows.Count is 0)
            {
                throw new Exception("There are no users");
            }


            return userDataTable.ConvertDataTableToList<User>();
        }

        public async Task<(string, string, DateTime)> GetUserByRefreshToken(string refresh)
        {
            var token = _context.HttpContext!.Request.Headers["Authorization"].FirstOrDefault()!.Split(" ").Last();

            if (refresh is null || string.IsNullOrEmpty(refresh))
                throw new Exception("Invalid client request");


            DataTable userdataTable = await _userRepository.GetUser();

            if (userdataTable is null || userdataTable.Rows.Count <= 0)
                throw new Exception("No users found");


            List<User> userList = userdataTable.ConvertDataTableToList<User>();


            User user = userList.Find(i => i.RefreshToken == refresh)!;


            if (user is null || user.RefreshTokenExpiryTime <= DateTime.Now)
                throw new Exception("Invalid refresh token");


            var tokenGenerator = _tokenConfigure.GenerateToken(user);

            _tokenConfigure.RevokeToken(token);

            string newAcessToken = tokenGenerator.Result.Item1;
            string newRefreshToken = tokenGenerator.Result.Item2;


            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiryTime = DateTime.Now.AddHours(5);


            await _userRepository.UpdateUser(user);

            return (user.RefreshToken, newAcessToken, user.RefreshTokenExpiryTime);
        }
    }
}