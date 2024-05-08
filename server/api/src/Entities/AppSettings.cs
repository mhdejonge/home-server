namespace DeJonge.HomeServer.Entities;

public class AppSettings
{
    public const string FileName = "appsettings.json";

    public required string ConfigurationPath { get; init; }

    public required string PublicPasscode { get; init; }

    public required string PrivatePasscode { get; init; }

    public required string JwtSecretKeyPath { get; init; }

    public required string JwtIssuer { get; init; }

    public required string JwtAudience { get; init; }

    public required TimeSpan JwtLifespan { get; init; }
}
