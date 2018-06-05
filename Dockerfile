FROM nginx
COPY . /usr/share/nginx/html/
EXPOSE 80
CMD ["/usr/share/nginx/html/run.sh"]
