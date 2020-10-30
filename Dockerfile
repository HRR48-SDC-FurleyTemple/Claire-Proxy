FROM node:12.18.3
ENV NODE_ENV=production

WORKDIR /proxy

COPY ["package*.json", "./"]

RUN npm install

COPY . .

EXPOSE 8000

CMD ["node", "index.js"]