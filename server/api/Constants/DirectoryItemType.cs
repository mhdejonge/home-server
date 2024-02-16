namespace DeJonge.HomeServer.Constants;

using System.Text.Json.Serialization;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum DirectoryItemType
{
    Directory,
    File
}
