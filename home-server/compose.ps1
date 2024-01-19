docker build ./ssh -t dejonge-ssh
docker build ./client -t dejonge-client
docker build ./api -t dejonge-server
docker compose up -d
