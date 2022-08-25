git pull --rebase
docker stop lyssande
docker rm lyssande
docker build -t lyssande .
docker run -dit --name lyssande --ip 172.18.0.81 --network petit lyssande
