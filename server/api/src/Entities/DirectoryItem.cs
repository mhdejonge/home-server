namespace DeJonge.HomeServer.Entities;

using DeJonge.HomeServer.Constants;

public class DirectoryItem
{
    public required DirectoryItemType Type { get; set; }

    public required string FullPath { get; set; }

    public required string? Extension { get; set; }
}
