using MovtechForms._2___Domain._0._2___Interfaces._0._0._6___TokenInterfaces;

namespace MovtechForms._1___Application._0._6___Middlewares
{
    public class JwtMiddleware
    {
        private RequestDelegate _next;
        private List<string> _publicRoutes = new List<string>
        {
            "/login",
            "/user"

        };

        public JwtMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, ITokenConfigure tokenRevocation)
        {
            var path = context.Request.Path.Value!.ToLower();

            if (_publicRoutes.Contains(path))
            {
                await _next(context);
                return;
            }


            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token is null || tokenRevocation.IsTokenRevoked(token))
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsync("Please log in to access this route");
                return;
            }

            await _next(context);
        }
    }
}
