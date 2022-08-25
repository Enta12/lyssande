# LYSANDE

## setup project

### first setup 
- install nginx
- config nginx into reverse proxy

server {
    listen 80;
    listen [::]:80;

    server_name lyssande.pepintrie.fr;
    location / {
        proxy_pass http://172.18.0.81:8081;
        proxy_buffering off;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

- create network : docker network create --subnet=172.18.0.0/16 petit

### all setup
- docker build -t lyssande .
- docker run -dit --name lyssande --ip 172.18.0.81 --network petit lyssande
