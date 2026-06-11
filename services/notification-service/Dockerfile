FROM node:24

RUN corepack enable && corepack prepare yarn@stable --activate

WORKDIR /app

EXPOSE 3003

CMD ["tail", "-f", "/dev/null"]
