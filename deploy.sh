git pull --rebase
docker stop lysande
docker rm lysande
docker build -t lysande .
docker run -dit --name lysande --ip 172.18.0.81 --network petit lysande
