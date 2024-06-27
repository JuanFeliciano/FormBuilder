
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using MovtechForms.Domain.Interfaces;
using MovtechForms.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
ConfigureServices(builder.Services);

var app = builder.Build();

static void ConfigureServices(IServiceCollection services)
{
    services.AddControllers();
    services.AddSingleton<IDatabaseService, DatabaseService>();
}

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

app.Run();
