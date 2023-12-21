docker build ./sftp -t dejonge-sftp
docker build ./client -t dejonge-client
docker build ./api -t dejonge-server
docker compose up -d
