# develop
FROM node:22-alpine AS dev

WORKDIR /app
ENV NODE_ENV=development

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]

# prod
FROM node:22-alpine AS prod

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY src ./src

USER node

EXPOSE 3000
CMD ["node", "src/index.js"]
