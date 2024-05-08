namespace DeJonge.HomeServer.Controllers;

using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[AllowAnonymous]
[Route("api/auth")]
public class AuthenticationController : ControllerBase
{
    private readonly BearerTokenService _bearerTokenService;
    private readonly AppSettings _appSettings;

    public AuthenticationController(BearerTokenService bearerTokenService, AppSettings appSettings)
    {
        _appSettings = appSettings;
        _bearerTokenService = bearerTokenService;
    }

    [HttpPost]
    public IActionResult Login([FromBody] HomeServerCredentials? credentials)
    {
        if (credentials?.Passcode == _appSettings.PublicPasscode)
        {
            return Ok(_bearerTokenService.CreateToken(new Claim(CustomClaims.AccessType, AccessType.Public)));
        }
        if (credentials?.Passcode == _appSettings.PrivatePasscode)
        {
            return Ok(_bearerTokenService.CreateToken(new Claim(CustomClaims.AccessType, AccessType.Private)));
        }
        return Unauthorized();
    }
}
