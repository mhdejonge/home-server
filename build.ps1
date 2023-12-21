cd api
dotnet publish home-server.csproj -c Release -r linux-x64 --no-self-contained -o bin/publish
cd ../client
ng build
cd ..
