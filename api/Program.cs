using DeJonge.HomeServer.Entities;
using DeJonge.HomeServer.Services;

var builder = WebApplication.CreateBuilder(args);

var appSettings = builder.Configuration.Get<AppSettings>()!;

builder.Configuration.AddJsonFile(appSettings.ConfigurationPath);

appSettings = builder.Configuration.Get<AppSettings>()!;

builder.Services.AddSingleton(appSettings);

builder.Services.AddSingleton<BearerTokenService>();

builder.Services.AddSingleton<DirectoryService>();

builder.Services.AddControllers();

builder.Services.AddAuthentication().AddJwtBearer(options =>
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

application.UseAuthentication();

application.UseAuthorization();

application.MapControllers();

application.Run();
