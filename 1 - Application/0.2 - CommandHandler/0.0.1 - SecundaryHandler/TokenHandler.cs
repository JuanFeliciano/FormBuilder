using Microsoft.IdentityModel.Tokens;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._6___TokenInterfaces;
using MovtechForms.Domain.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MovtechForms._1___Application._0._2___CommandHandler._0._0._1___SecundaryHandler
{
    public class TokenHandler : ITokenRevocation
    {
        private readonly IConfiguration _configuration;
        private HashSet<string> _tokenRevoked;

        public TokenHandler(IConfiguration configuration, HashSet<string> token)
        {
            _configuration = configuration;
            _tokenRevoked = token;
        }
        public string GenerateToken(Users user)
        {
            var secretKey = Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]!);

            var key = new SymmetricSecurityKey(secretKey);
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public void RevokeToken(string token)
        {
            _tokenRevoked.Add(token);
        }

        public bool IsTokenRevoked(string token)
        {
            return _tokenRevoked.Contains(token);
        }
    }
}
