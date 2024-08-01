using MovtechForms._2___Domain._0._2___Interfaces._0._0._2___HandlerInterfaces._0._0._0._1___SecundaryInterfaces;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._6___TokenInterfaces;

namespace MovtechForms._1___Application._0._2___CommandHandler._0._0._1___SecundaryHandler
{
    public class LogoutHandler : ILogoutHandler
    {
        private ITokenConfigure _tokenRevoke;

        public LogoutHandler(ITokenConfigure tokenRevoke)
        {
            _tokenRevoke = tokenRevoke;
        }


        public async Task Logout(HttpContext context)
        {
            string token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last()!;

            _tokenRevoke.RevokeToken(token);
        }
    }
}
