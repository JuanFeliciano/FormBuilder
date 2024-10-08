using Microsoft.IdentityModel.Tokens;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._6___TokenInterfaces;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces.RepositoryInterfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace MovtechForms._1___Application._0._2___CommandHandler._0._0._1___SecundaryHandler
{
    public class TokenConfigure : ITokenConfigure
    {
        private IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private HashSet<string> _tokenRevoked;
        private List<string> _tokenValid;

        public TokenConfigure(IConfiguration configuration, HashSet<string> tokenRevoked, List<string> tokenValid, IUserRepository userRepo)
        {
            _configuration = configuration;
            _tokenRevoked = tokenRevoked;
            _tokenValid = tokenValid;
            _userRepository = userRepo;
        }
        public async Task<(string, string, string)> GenerateToken(User user)
        {

            byte[] secretKey = Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]!);

            SymmetricSecurityKey key = new SymmetricSecurityKey(secretKey);
            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            Claim[] claims =
            [
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            ];

            JwtSecurityToken tokenJwt = new(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(10),
                signingCredentials: creds
                );

            string token = new JwtSecurityTokenHandler().WriteToken(tokenJwt);
            string refreshToken = GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.Now.AddHours(5);

            await _userRepository.UpdateUser(user);


            _tokenValid?.Add(token);

            return (token, refreshToken, user.Role);
        }


        public string GenerateRefreshToken()
        {
            byte[] random = new byte[32];

            using (RandomNumberGenerator randomNumber = RandomNumberGenerator.Create())
            {
                randomNumber.GetBytes(random);

                return Convert.ToBase64String(random);
            }
        }


        public void RevokeToken(string token)
        {
            _tokenRevoked.Add(token);
            _tokenValid.Remove(token);
        }

        public bool IsTokenRevoked(string token)
        {
            return _tokenRevoked.Contains(token);
        }


        public bool CountTokenValidList()
        {
            return _tokenValid.Count > 0;
        }
    }

}