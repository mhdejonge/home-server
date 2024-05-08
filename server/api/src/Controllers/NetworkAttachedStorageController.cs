using System.Security.Claims;

namespace DeJonge.HomeServer.Controllers;

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
        return User.FindFirst(CustomClaims.AccessType) != null ? Ok() : Forbid();
    }

    [HttpGet("locked/{**slug}")]
    public IActionResult Locked()
    {
        return User.FindFirstValue(CustomClaims.AccessType) == AccessType.Private ? Ok() : Forbid();
    }
}
