# Stage 1: Build the Angular SSR application
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve using Node SSR
FROM node:22-alpine
WORKDIR /app
RUN apk add --no-cache tzdata && cp /usr/share/zoneinfo/Asia/Kolkata /etc/localtime && echo "Asia/Kolkata" > /etc/timezone
COPY --from=build /app/dist/services-site-frontend ./dist/services-site-frontend
COPY --from=build /app/package*.json ./
RUN npm ci --omit=dev

ENV TZ=Asia/Kolkata
ENV PORT=4000
ENV NODE_ENV=production
EXPOSE 4000

CMD ["node", "dist/services-site-frontend/server/server.mjs"]
