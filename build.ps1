docker build ./dejonge-sftp -t dejonge-sftp
docker build ./dejonge-client -t dejonge-client
docker build ./dejonge-server -t dejonge-server
docker compose up -d
