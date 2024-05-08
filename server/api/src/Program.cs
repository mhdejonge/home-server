using System.Reflection;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.SetBasePath(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)!);
builder.Configuration.AddJsonFile(AppSettings.FileName);

var appSettings = builder.Configuration.Get<AppSettings>()!;
builder.Configuration.AddJsonFile(appSettings.ConfigurationPath, !builder.Environment.IsProduction());
appSettings = builder.Configuration.Get<AppSettings>()!;

var bearerTokenService = new BearerTokenService(appSettings);
await bearerTokenService.Initialize();

builder.Services.AddSingleton(appSettings);
builder.Services.AddSingleton(bearerTokenService);
builder.Services.AddControllers();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new()
    {
        IssuerSigningKeys = bearerTokenService.GetSigningKeys(),
        ValidAudience = appSettings.JwtAudience,
        ValidIssuer = appSettings.JwtIssuer
    };
    options.Validate();
});

await using var application = builder.Build();
application.UseRouting();
application.UseCors(policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
application.UseAuthentication();
application.UseAuthorization();
application.MapControllers();
await application.RunAsync();
