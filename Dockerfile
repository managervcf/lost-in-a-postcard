FROM node:13.14.0-alpine
WORKDIR /app
COPY package*.json ./
COPY src/client/package*.json src/client/
RUN npm ci 
RUN npm ci --prefix src/client
COPY . ./
RUN npm run build
CMD ["node", "build/server/index.js"]