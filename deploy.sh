git pull --rebase
docker stop lysande_front_1
docker stop lysande_adminer_1
docker stop lysande_mysql_db_1
docker stop lysande_api_1
docker stop web800_front_1
docker stop web800_adminer_1
docker stop web800_mysql_db_1
docker stop web800_api_1
docker stop terraria
docker-compose up --build -d
