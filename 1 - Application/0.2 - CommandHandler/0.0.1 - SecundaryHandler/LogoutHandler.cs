using MovtechForms._2___Domain._0._2___Interfaces._0._0._2___HandlerInterfaces._0._0._0._1___SecundaryInterfaces;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._6___TokenInterfaces;

namespace MovtechForms._1___Application._0._2___CommandHandler._0._0._1___SecundaryHandler
{
    public class LogoutHandler : ILogoutHandler
    {
        private ITokenRevocation _tokenRevoke;

        public LogoutHandler(ITokenRevocation tokenRevoke)
        {
            _tokenRevoke = tokenRevoke;
        }


        public async Task Logout(HttpContext context)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token is null)
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsync("You need to be logged in to log out");
                return;
            }

            _tokenRevoke.RevokeToken(token);
        }
    }
}
