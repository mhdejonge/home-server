using System.Reflection;
using DeJonge.HomeServer.Entities;
using DeJonge.HomeServer.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.SetBasePath(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)!);

builder.Configuration.AddJsonFile(AppSettings.FileName);

var appSettings = builder.Configuration.Get<AppSettings>()!;

if (builder.Environment.IsProduction())
{
    builder.Configuration.AddJsonFile(appSettings.ConfigurationPath);
    appSettings = builder.Configuration.Get<AppSettings>()!;
}

builder.Services.AddSingleton(appSettings);

builder.Services.AddSingleton<BearerTokenService>();

builder.Services.AddSingleton<DirectoryService>();

builder.Services.AddControllers();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new()
    {
        IssuerSigningKey = appSettings.MakeJwtKey(),
        ValidAudience = appSettings.JwtAudience,
        ValidIssuer = appSettings.JwtIssuer
    };
    options.Validate();
});

var application = builder.Build();

application.UseRouting();

application.UseCors(policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

application.UseAuthentication();

application.UseAuthorization();

application.MapControllers();

application.Run();
