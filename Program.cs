using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MovtechForms._1___Application._0._2___CommandHandler;
using MovtechForms._1___Application._0._2___CommandHandler._0._0._1___SecundaryHandler;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._1___RepositoryInterfaces._0._0._0._1___CoreInterfaces;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._2___HandlerInterfaces;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._2___HandlerInterfaces._0._0._0._1___SecundaryInterfaces;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._3___ServicesInterfaces;
using MovtechForms.Application.Repositories;
using MovtechForms.Application.Repositories.MainRepositories;
using MovtechForms.Application.Repositories.UseCases;
using MovtechForms.Application.Services;
using MovtechForms.Application.Services.CoreServices;
using MovtechForms.Application.Services.MainServices;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using MovtechForms.Domain.Interfaces.RepositoryInterfaces;
using MovtechForms.Domain.Interfaces.ServicesInterfaces;
using MovtechForms.Infrastructure;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
ConfigureServices(builder.Services, builder.Configuration);

var app = builder.Build();

Configure(app);

static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
{

    // Registro de serviços
    services.AddScoped<IFormGroupService, FormGroupService>();
    services.AddScoped<IFormService, FormService>();
    services.AddScoped<IQuestionService, QuestionService>();
    services.AddScoped<IAnswerService, AnswerService>();
    services.AddScoped<IUserService, UserService>();
    services.AddScoped<ILoginService, LoginService>();
    services.AddSingleton<TokenService>();

    // Registro de handlers
    services.AddScoped<IFormGroupHandler, FormGroupHandler>();
    services.AddScoped<IFormHandler, FormHandler>();
    services.AddScoped<IQuestionHandler, QuestionHandler>();
    services.AddScoped<IAnswerHandler, AnswerHandler>();
    services.AddScoped<ILoginHandler, LoginHandler>();
    services.AddScoped<IUserHandler, UserHandler>();

    // Registro de repositórios
    services.AddScoped<IFormGroupRepository, FormGroupRepository>();
    services.AddScoped<IFormRepository, FormRepository>();
    services.AddScoped<IQuestionRepository, QuestionRepository>();
    services.AddScoped<IAnswerRepository, AnswerRepository>();
    services.AddScoped<IUserRepository, UserRepository>();

    // Registro do serviço ForEach
    services.AddScoped<IForEach<FormsGroup>, FormGroupForEach>();
    services.AddScoped<IForEach<Forms>, FormForEach>();
    services.AddScoped<IForEach<Questions>, QuestionForEach>();

    //Registro de outros serviços necessarios
    services.AddScoped<IDatabaseService, DatabaseService>();

    // Outros registros
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
}


static void Configure(WebApplication app)
{
    // Ative o Swagger e a UI do Swagger em todos os ambientes
    app.UseSwagger();
    app.UseSwaggerUI(option =>
    {
        option.SwaggerEndpoint("/swagger/v1/swagger.json", "Forms Builder API v1");
        option.RoutePrefix = string.Empty; // Define a UI do Swagger na raiz do aplicativo
    });

    // Outros middlewares
    app.UseHttpsRedirection();

    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();
}

// Configure the HTTP request pipeline.

app.Run();
