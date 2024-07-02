
using MovtechForms.Application.Services;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using MovtechForms.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
ConfigureServices(builder.Services);

var app = builder.Build();

static void ConfigureServices(IServiceCollection services)
{
    services.AddScoped<IDatabaseService, DatabaseService>();
    services.AddScoped<IServices<FormsGroup>, FormGroupService>();
    services.AddScoped<IServices<Forms>, FormService>();
    services.AddScoped<IServices<Questions>, QuestionService>();
    services.AddControllers();
}

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

app.Run();
