FROM node:12.18.3
WORKDIR /app
COPY package.json .

ARG NODE_ENV

RUN if [ "$NODE_ENV" = "prod" ]; \
        then yarn install --production; \
        else yarn install; \
        fi

COPY . .
ENV PORT 3000
EXPOSE $PORT
CMD ["node", "index.js"]

