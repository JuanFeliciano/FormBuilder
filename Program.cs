using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MovtechForms._1___Application._0._1___Repositories._0._0._1___SecundaryRepositories;
using MovtechForms._1___Application._0._2___CommandHandler;
using MovtechForms._1___Application._0._2___CommandHandler._0._0._1___SecundaryHandler;
using MovtechForms._1___Application._0._3___Services._0._0._1___SecundaryServices;
using MovtechForms._1___Application._0._6___Middlewares;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._1___RepositoryInterface._0._0._0._1___SecundaryInterface;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._1___RepositoryInterfaces._0._0._0._1___CoreInterfaces;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._2___HandlerInterface._0._0._0._1___SecundaryInterface;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._2___HandlerInterfaces;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._2___HandlerInterfaces._0._0._0._1___SecundaryInterfaces;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._3___ServicesInterface._0._0._0._1___SecundaryInterface;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._3___ServicesInterfaces;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._3___ServicesInterfaces._0._0._0._1___SecundaryInterfaces;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._4___DatabaseInterface;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._5___UsecasesInterfaces;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._6___TokenInterfaces;
using MovtechForms._2___Domain._0._3___Models;
using MovtechForms._3___Infrastructure;
using MovtechForms.Application.Repositories;
using MovtechForms.Application.Repositories.MainRepositories;
using MovtechForms.Application.Repositories.UseCases;
using MovtechForms.Application.Services;
using MovtechForms.Application.Services.CoreServices;
using MovtechForms.Application.Services.MainServices;
using MovtechForms.Domain.Interfaces;
using MovtechForms.Domain.Interfaces.RepositoryInterfaces;
using MovtechForms.Domain.Interfaces.ServicesInterfaces;
using MovtechForms.Infrastructure;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
ConfigureServices(builder.Services, builder.Configuration);

var app = builder.Build();

var env = app.Services.GetRequiredService<IWebHostEnvironment>();

Configure(app, env);

static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
{
    // Registro de serviços
    services.AddScoped<IFormGroupService, FormGroupService>();
    services.AddScoped<IFormService, FormService>();
    services.AddScoped<IQuestionService, QuestionService>();
    services.AddScoped<IAnswerService, AnswerService>();
    services.AddScoped<IUserService, UserService>();
    services.AddScoped<ILoginService, LoginService>();
    services.AddScoped<ILogoutService, LogoutService>();
    services.AddScoped<INpsService, NpsService>();

    // Registro de handlers
    services.AddScoped<IFormGroupHandler, FormGroupHandler>();
    services.AddScoped<IFormHandler, FormHandler>();
    services.AddScoped<IQuestionHandler, QuestionHandler>();
    services.AddScoped<IAnswerHandler, AnswerHandler>();
    services.AddScoped<ILoginHandler, LoginHandler>();
    services.AddScoped<ILogoutHandler, LogoutHandler>();
    services.AddScoped<IUserHandler, UserHandler>();
    services.AddScoped<ITokenConfigure, TokenConfigure>();
    services.AddScoped<INpsHandler, NpsHandler>();

    // Registro de repositórios
    services.AddScoped<IFormGroupRepository, FormGroupRepository>();
    services.AddScoped<IFormRepository, FormRepository>();
    services.AddScoped<IQuestionRepository, QuestionRepository>();
    services.AddScoped<IAnswerRepository, AnswerRepository>();
    services.AddScoped<IUserRepository, UserRepository>();
    services.AddScoped<INpsRepository, NpsRepository>();

    // Registro do serviço ForEach
    services.AddScoped<IFormGroupForEach, FormGroupForEach>();
    services.AddScoped<IFormForEach, FormForEach>();
    services.AddScoped<IQuestionForEach, QuestionForEach>();

    // Registro de outros serviços necessários
    services.AddScoped<IDatabaseService, DatabaseService>();
    services.AddScoped<IBulkService, BulkService>();

    // Outros registros
    services.AddSingleton<HashSet<string>>();
    services.AddSingleton(new List<string>());
    services.AddSingleton<RefreshTokenRequest>();
    services.AddHttpContextAccessor();
    services.AddControllers();

    services.AddSwaggerGen();

    services.AddAuthentication(option =>
    {
        option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    }).AddJwtBearer(option =>
    {
        option.RequireHttpsMetadata = false;
        option.SaveToken = true;
        option.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = configuration["Jwt:Issuer"],
            ValidAudience = configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:SecretKey"]!))
        };
    });

    services.AddSpaStaticFiles(conf =>
    {
        conf.RootPath = "wwwroot"; // Configura a pasta onde o Angular vai gerar os arquivos estáticos
    });
}

static void Configure(WebApplication app, IWebHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
        app.UseCors(i => i.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
    }
    else
    {
        app.UseExceptionHandler("/Error");
        app.UseHsts();
    }

    //app.UseHttpsRedirection();
    app.UseStaticFiles(); // Serve arquivos estáticos da pasta wwwroot
    app.UseSpaStaticFiles(); // Serve arquivos estáticos da pasta wwwroot configurada para a SPA

    app.UseMiddleware<JwtMiddleware>();

    app.UseRouting();

    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();
}

app.Run();