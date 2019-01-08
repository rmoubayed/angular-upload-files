FROM ubuntu:16.04

WORKDIR /opt/

#Install nginx
RUN apt-get update
RUN apt-get install -y nginx=1.10.*

#Add the customized NGINX configuration
RUN rm -f /etc/nginx/nginx.conf
RUN rm -f /etc/nginx/sites-enabled/*

COPY nginx/nginx.conf /etc/nginx/
COPY nginx/site.conf /etc/nginx/sites-enabled

#Copy the certificates
RUN mkdir -p /etc/pki/nginx
COPY nginx/certs/* /etc/pki/nginx/

#Copy the build its destination on the server
RUN mkdir -p /mnt/frontend-lotus/Build/lotus/
COPY Build/lotus/ /mnt/frontend-lotus/Build/lotus/
RUN rm -Rf *

#The command to run the container
CMD ["nginx", "-g", "daemon off;"]