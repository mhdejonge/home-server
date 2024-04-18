namespace DeJonge.HomeServer.Services;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using DeJonge.HomeServer.Entities;
using Microsoft.IdentityModel.Tokens;

public class BearerTokenService
{
    private readonly AppSettings _appSettings;
    private readonly JwtSecurityTokenHandler _tokenHandler;
    private readonly SigningCredentials _signingCredentials;

    public BearerTokenService(AppSettings appSettings)
    {
        _appSettings = appSettings;
        _tokenHandler = new();
        _signingCredentials = new(appSettings.MakeJwtKey(), SecurityAlgorithms.HmacSha256);
    }

    public string CreateToken(params Claim[] claims)
    {
        var issuer = _appSettings.JwtIssuer;
        var audience = _appSettings.JwtAudience;
        var notBefore = DateTime.Now;
        var expires = notBefore.Add(_appSettings.JwtLifespan);
        var header = new JwtHeader(_signingCredentials);
        var payload = new JwtPayload(issuer, audience, claims, notBefore, expires);
        return _tokenHandler.WriteToken(new JwtSecurityToken(header, payload));
    }
}
