var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var application = builder.Build();

application.UseRouting();

application.UseAuthentication();

application.UseAuthorization();

application.MapControllers();

application.Run();
