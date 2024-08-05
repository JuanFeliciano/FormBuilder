using MovtechForms.Domain.Entities;

namespace MovtechForms._2___Domain._0._2___Interfaces._0._0._6___TokenInterfaces
{
    public interface ITokenConfigure
    {
        Task<(string, string)> GenerateToken(User user);
        string GenerateRefreshToken();
        void RevokeToken(string token);
        bool IsTokenRevoked(string token);
        bool CountTokenValidList();
    }
}
