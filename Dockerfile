FROM node:14

WORKDIR /app

COPY package*.json .
RUN npm install

COPY tsconfig.json .
COPY public ./public
COPY src ./src

RUN npm run build

CMD ["npm", "start"]