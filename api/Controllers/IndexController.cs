using Microsoft.AspNetCore.Mvc;
using DeJonge.HomeServer.Entities;

namespace DeJonge.HomeServer.Controllers;

[ApiController]
public class IndexController
{
    [HttpGet("{path?}")]
    public ActionResult<List<DirectoryItem>> GetDirectoryInfo([FromRoute] string? path = null)
    {
        return new List<DirectoryItem>();
    }
}
