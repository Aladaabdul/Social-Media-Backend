FROM node:22.5.1-alpine3.20

RUN addgroup -S app
RUN adduser -S -G app app

WORKDIR /app

COPY package*.json .

RUN chown -R app:app /app

USER app

RUN npm install

COPY --chown=app:app . .

EXPOSE 8000

CMD ["node", "app.js"]