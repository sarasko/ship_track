FROM node:24

RUN corepack enable && corepack prepare yarn@stable --activate

WORKDIR /app

EXPOSE 3002

CMD ["tail", "-f", "/dev/null"]
