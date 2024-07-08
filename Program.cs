
using Microsoft.OpenApi.Models;
using MovtechForms.Application.Repositories;
using MovtechForms.Application.Services;
using MovtechForms.Application.Utilities.FormGroupUtils;
using MovtechForms.Application.Utilities.FormUtils;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using MovtechForms.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
ConfigureServices(builder.Services);

var app = builder.Build();

Configure(app, builder.Environment);

static void ConfigureServices(IServiceCollection services)
{
    
    // Registro de serviços
    services.AddScoped<IServices<FormsGroup>,FormGroupService>();
    services.AddScoped<IServices<Forms>, FormService>();
    services.AddScoped<IServices<Questions>, QuestionService>();

    // Registro de repositórios
    services.AddScoped<IRepository<FormsGroup>, FormGroupRepository>();
    services.AddScoped<IRepository<Forms>, FormRepository>();
    services.AddScoped<IRepository<Questions>, QuestionRepository>();

    // Registro do serviço ForEach
    services.AddScoped<IForEach<FormsGroup>, FormGroupForEach>();
    services.AddScoped<IForEach<Forms>, FormForEach>();

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
    });
}

static void Configure(WebApplication app, IWebHostEnvironment env)
{
    // Ative o Swagger e a UI do Swagger em todos os ambientes
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Nome da sua API v1");
        c.RoutePrefix = string.Empty; // Define a UI do Swagger na raiz do aplicativo
    });

    // Outros middlewares
    app.UseHttpsRedirection();
    app.UseAuthorization();

    app.MapControllers();
}

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

app.Run();
