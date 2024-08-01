using MovtechForms._2___Domain._0._2___Interfaces._0._0._2___HandlerInterfaces._0._0._0._1___SecundaryInterfaces;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._3___ServicesInterfaces._0._0._0._1___SecundaryInterfaces;

namespace MovtechForms._1___Application._0._3___Services._0._0._1___SecundaryServices
{
    public class LogoutService : ILogoutService
    {
        private readonly ILogoutHandler _logoutHandler;

        public LogoutService(ILogoutHandler logoutHandler)
        {
            _logoutHandler = logoutHandler;
        }

        public void Logout(HttpContext context)
        {
            _logoutHandler.Logout(context);
        }
    }
}
