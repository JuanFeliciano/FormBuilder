using MovtechForms.Domain.Entities;

namespace MovtechForms._2___Domain._0._2___Interfaces._0._0._6___TokenInterfaces
{
    public interface ITokenRevocation
    {
        string GenerateToken(Users user);
        void RevokeToken(string token);
        bool IsTokenRevoked(string token);
    }
}
