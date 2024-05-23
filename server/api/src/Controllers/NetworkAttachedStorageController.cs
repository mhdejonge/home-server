namespace DeJonge.HomeServer.Controllers;

using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Authorize]
[Route("api/nas")]
public class NetworkAttachedStorageController : ControllerBase
{
    [HttpGet("files/{**slug}")]
    public IActionResult Files()
    {
        return User.FindFirstValue(CustomClaims.AccessType) is AccessType.Public or AccessType.Private ? Ok() : Forbid();
    }

    [HttpGet("locked/{**slug}")]
    public IActionResult Locked()
    {
        return User.FindFirstValue(CustomClaims.AccessType) is AccessType.Private ? Ok() : Forbid();
    }
}
