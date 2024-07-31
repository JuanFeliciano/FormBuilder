using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.IdentityModel.Tokens;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._6___TokenInterfaces;
using MovtechForms.Domain.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MovtechForms._1___Application._0._2___CommandHandler._0._0._1___SecundaryHandler
{
    public class TokenRevocation : ITokenRevocation
    {
        private readonly IConfiguration _configuration;
        private HashSet<string> _tokenRevoked;
        private List<string> _tokenValid;

        public TokenRevocation(IConfiguration configuration, HashSet<string> tokenRevoked, List<string> tokenValid)
        {
            _configuration = configuration;
            _tokenRevoked = tokenRevoked;
            _tokenValid = tokenValid;
        }
        public string GenerateToken(Users user)
        {
            if (_tokenValid.Count != 0)
                throw new Exception("You are already logged in");

            var secretKey = Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]!);

            var key = new SymmetricSecurityKey(secretKey);
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            JwtSecurityToken tokenJwt = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
                );

            string token = new JwtSecurityTokenHandler().WriteToken(tokenJwt);


            _tokenValid?.Add(token);
            Console.WriteLine(_tokenValid);

            return token;
        }

        public void RevokeToken(string token)
        {
            _tokenRevoked.Add(token);
            if(_tokenValid is not null)
                _tokenValid.Clear();

            Console.WriteLine(_tokenValid);
        }

        public bool IsTokenRevoked(string token)
        {
            return _tokenRevoked.Contains(token);
        }
    }
}
