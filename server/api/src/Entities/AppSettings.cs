namespace DeJonge.HomeServer.Entities;

using System.Text;
using Microsoft.IdentityModel.Tokens;

public class AppSettings
{
    public const string FileName = "appsettings.json";

    public required string ConfigurationPath { get; init; }

    public required string PublicPasscode { get; init; }

    public required string PrivatePasscode { get; init; }

    public required string PublicDirectory { get; init; }

    public required string PrivateDirectory { get; init; }

    public required string JwtSecret { get; init; }

    public required string JwtIssuer { get; init; }

    public required string JwtAudience { get; init; }

    public required TimeSpan JwtLifespan { get; init; }

    public SecurityKey MakeJwtKey() => new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtSecret));
}
