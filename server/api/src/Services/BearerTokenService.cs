namespace DeJonge.HomeServer.Services;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text.Json;
using Microsoft.IdentityModel.Tokens;

public class BearerTokenService(AppSettings appSettings)
{
    private readonly JwtSecurityTokenHandler _tokenHandler = new();
    private JsonWebKeySet _jsonWebKeySet = default!;

    public string CreateToken(params Claim[] claims)
    {
        var issuer = appSettings.JwtIssuer;
        var audience = appSettings.JwtAudience;
        var notBefore = DateTime.Now;
        var expires = notBefore.Add(appSettings.JwtLifespan);
        var securityKey = _jsonWebKeySet.Keys.Single();
        var header = new JwtHeader(new SigningCredentials(securityKey, SecurityAlgorithms.RsaSha256));
        var payload = new JwtPayload(issuer, audience, claims, notBefore, expires);
        return _tokenHandler.WriteToken(new JwtSecurityToken(header, payload));
    }

    public IList<SecurityKey> GetSigningKeys()
    {
        return _jsonWebKeySet.GetSigningKeys();
    }

    public async Task Initialize()
    {
        var secretKeyPath = appSettings.JwtSecretKeyPath;
        if (File.Exists(secretKeyPath))
        {
            _jsonWebKeySet = JsonWebKeySet.Create(await File.ReadAllTextAsync(secretKeyPath));
        }
        else
        {
            var rsaSecurityKey = new RsaSecurityKey(RSA.Create());
            rsaSecurityKey.KeyId = Base64UrlEncoder.Encode(rsaSecurityKey.ComputeJwkThumbprint());
            var jsonWebKey = JsonWebKeyConverter.ConvertFromRSASecurityKey(rsaSecurityKey);
            jsonWebKey.Use = JsonWebKeyUseNames.Sig;
            _jsonWebKeySet = new JsonWebKeySet();
            _jsonWebKeySet.Keys.Add(jsonWebKey);
            await File.WriteAllTextAsync(secretKeyPath, JsonSerializer.Serialize(_jsonWebKeySet));
        }
    }
}
