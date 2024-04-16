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
        return IsAllowedDirectory(_appSettings.PublicDirectory, path) || (allowPrivate && IsAllowedDirectory(_appSettings.PrivateDirectory, path));
    }

    private static bool IsAllowedDirectory(string parentDirectory, string childDirectory)
    {
        childDirectory = EnsureEndingDirectorySeparator(childDirectory);
        return childDirectory.StartsWith(parentDirectory);
    }

    public List<DirectoryItem> ListDirectory(string path)
    {
        var directories = Directory.GetDirectories(path);
        var files = Directory.GetFiles(path);
        return directories.Select(directory => new DirectoryItem
        {
            Type = DirectoryItemType.Directory,
            FullPath = directory,
            Extension = null
        }).Concat(files.Select(file => new DirectoryItem
        {
            Type = DirectoryItemType.File,
            FullPath = file,
            Extension = Path.GetExtension(file)
        })).ToList();
    }

    private static string EnsureEndingDirectorySeparator(string path)
    {
        return Path.TrimEndingDirectorySeparator(path) + Path.DirectorySeparatorChar;
    }
}
