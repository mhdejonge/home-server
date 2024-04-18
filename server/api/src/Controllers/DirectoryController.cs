namespace DeJonge.HomeServer.Controllers;

using System.Security.Claims;
using DeJonge.HomeServer.Constants;
using DeJonge.HomeServer.Entities;
using DeJonge.HomeServer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
[ApiController]
[Route("api/ls")]
public class DirectoryController : ControllerBase
{
    private readonly DirectoryService _directoryService;
    private readonly AppSettings _appSettings;

    public DirectoryController(DirectoryService directoryService, AppSettings appSettings)
    {
        _directoryService = directoryService;
        _appSettings = appSettings;
    }

    [HttpGet]
    public IActionResult GetDirectoryInfo([FromQuery] string? path = null)
    {
        var allowPrivate = User.FindFirstValue(CustomClaims.AccessType) == AccessType.Private;
        if (string.IsNullOrEmpty(path))
        {
            var items = _directoryService.ListDirectory(_appSettings.PublicDirectory);
            if (allowPrivate)
            {
                items.AddRange(_directoryService.ListDirectory(_appSettings.PrivateDirectory));
            }
            return Ok(items);
        }
        if (_directoryService.IsValidDirectory(path, allowPrivate))
        {
            return Ok(_directoryService.ListDirectory(path));
        }
        return Forbid();
    }
}
