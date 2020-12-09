FROM node:13.14.0-alpine
WORKDIR /app
COPY package*.json ./
COPY src/client/package*.json src/client/
RUN npm install
RUN npm install --prefix src/client
COPY . ./
RUN npm run build
CMD ["npm", "start"]