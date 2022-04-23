git push --rebase
docker stop lysande_front_1
docker stop lysande_adminer_1
docker stop lysande_db_1
docker stop lysande_1
docker-compose up --build -d
