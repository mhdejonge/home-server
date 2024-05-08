using System.Security.Claims;

namespace DeJonge.HomeServer.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[AllowAnonymous]
[Route("api/nas")]
public class NetworkAttachedStorageController : ControllerBase
{
    [HttpGet("files")]
    public IActionResult Files()
    {
        return User.FindFirst(CustomClaims.AccessType) != null ? Ok() : Forbid();
    }

    [HttpGet("locked")]
    public IActionResult Locked()
    {
        return User.FindFirstValue(CustomClaims.AccessType) == AccessType.Private ? Ok() : Forbid();
    }
}
