
using MovtechForms.Application.Services.GroupFormService;
using MovtechForms.Domain.Interfaces;
using MovtechForms.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
ConfigureServices(builder.Services);

var app = builder.Build();

static void ConfigureServices(IServiceCollection services)
{
    services.AddScoped<IDatabaseService, DatabaseService>();
    services.AddScoped<IFormGroupService, FormGroupService>();
    services.AddControllers();
}

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

app.Run();
