using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MovtechForms.Application.Repositories;
using MovtechForms.Application.Repositories.MainRepositories;
using MovtechForms.Application.Services;
using MovtechForms.Application.Services.MainServices;
using MovtechForms.Application.Utilities;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using MovtechForms.Infrastructure;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
ConfigureServices(builder.Services, builder.Configuration);

var app = builder.Build();

Configure(app, builder.Environment);

static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
{

    // Registro de serviços
    services.AddScoped<IServices<FormsGroup>, FormGroupService>();
    services.AddScoped<IServices<Forms>, FormService>();
    services.AddScoped<IServices<Questions>, QuestionService>();
    services.AddScoped<IUserService, UserService>();
    services.AddScoped<ILoginService, LoginService>();

    // Registro de repositórios
    services.AddScoped<IRepository<FormsGroup>, FormGroupRepository>();
    services.AddScoped<IRepository<Forms>, FormRepository>();
    services.AddScoped<IRepository<Questions>, QuestionRepository>();
    services.AddScoped<IUserRepository, UserRepository>();
    services.AddScoped<ILoginRepository, LoginRepository>();

    // Registro do serviço ForEach
    services.AddScoped<IForEach<FormsGroup>, FormGroupForEach>();
    services.AddScoped<IForEach<Forms>, FormForEach>();
    services.AddScoped<IForEach<Questions>, QuestionForEach>();

    //Registro de outros serviços necessarios
    services.AddScoped<IDatabaseService, DatabaseService>();

    // Outros registros
    services.AddControllers();
    services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo
        {
            Version = "v1",
            Title = "Forms Builder",
            Description = "Constructor Forms"
        });

        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Name = "Authorization",
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer",
            BearerFormat = "JWT",
            In = ParameterLocation.Header,
            Description = "Header Authorization using Bearer scheme \r\n\r\n Write 'Bearer' before put your key"
        });

        c.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
            }
        });

    });
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


    services.AddControllers();
    services.AddSingleton<TokenService>();
}


static void Configure(WebApplication app, IWebHostEnvironment env)
{
    // Ative o Swagger e a UI do Swagger em todos os ambientes
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Forms Builder API v1");
        c.RoutePrefix = string.Empty; // Define a UI do Swagger na raiz do aplicativo
    });

    // Outros middlewares
    app.UseHttpsRedirection();

    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();
}

// Configure the HTTP request pipeline.

app.Run();
