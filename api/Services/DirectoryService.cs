namespace DeJonge.HomeServer.Services;

using DeJonge.HomeServer.Constants;
using DeJonge.HomeServer.Entities;

public class DirectoryService
{
    private readonly AppSettings _appSettings;

    public DirectoryService(AppSettings appSettings)
    {
        _appSettings = appSettings;
    }

    public bool IsValidDirectory(string path, bool allowPrivate)
    {
        if (File.Exists(path))
        {
            path = Path.GetDirectoryName(path)!;
        }
        if (!Directory.Exists(path))
        {
            return false;
        }
        var pathInfo = new DirectoryInfo(Path.TrimEndingDirectorySeparator(path));
        return IsAllowedDirectory(new DirectoryInfo(_appSettings.PublicDirectory), pathInfo) ||
               (allowPrivate && IsAllowedDirectory(new DirectoryInfo(_appSettings.PrivateDirectory), pathInfo));
    }

    private static bool IsAllowedDirectory(DirectoryInfo parentDirectory, DirectoryInfo childDirectory)
    {
        if (childDirectory.FullName == parentDirectory.FullName)
        {
            return true;
        }
        while (childDirectory.Parent != null)
        {
            if (childDirectory.Parent.FullName == parentDirectory.FullName)
            {
                return true;
            }
            childDirectory = childDirectory.Parent;
        }
        return false;
    }

    public List<DirectoryItem> ListDirectory(string path)
    {
        var directories = Directory.GetDirectories(path);
        var files = Directory.GetFiles(path);
        return directories.Select(directory => new DirectoryItem
        {
            Type = DirectoryItemType.Directory,
            FullPath = directory
        }).Concat(files.Select(file => new DirectoryItem
        {
            Type = DirectoryItemType.File,
            FullPath = file
        })).ToList();
    }
}
