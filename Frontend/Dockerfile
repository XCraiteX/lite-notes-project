FROM node:22 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm i axios
COPY . .
RUN npm run build

FROM node:22 AS production
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["npm", "start"]