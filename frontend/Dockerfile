# Use the official Node.js 20 Alpine image as a base
FROM node:22-alpine AS builder
# set the working directory inside the container
WORKDIR /app
# copy package.json and package-lock.json (if available)
COPY package.json package-lock.json ./
# install dependencies
RUN npm ci
# copy the rest of the application code
COPY . .
# Build app to /app/dist
RUN npm run build

# Build production image using nginx
FROM nginx:alpine AS prod
# Copy nginx template configuration
COPY nginx.template.conf /etc/nginx/nginx.template.conf
# Copy web app files from build stage
COPY --from=builder /app/dist /usr/share/nginx/html/
# Substitute variable references in the Nginx config template for real values from the environment
CMD envsubst '$BACKEND_LOCATION $FRONTEND_PORT' < /etc/nginx/nginx.template.conf > /etc/nginx/nginx.conf && cat /etc/nginx/nginx.conf && nginx -g 'daemon off;'
# healthcheck
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "curl", "localhost/healthCheck" ]
# Port 80 is the default port for HTTP traffic
EXPOSE 80

# Build development image using vite
FROM node:22-alpine AS dev
# Set the working directory inside the container
WORKDIR /app
# Copy package.json and package-lock.json (if available)
COPY package*.json ./
# Install dependencies
RUN npm ci
# Copy the rest of your application code
COPY . .
# port 5173 is used by vite dev server
EXPOSE 5173
# Start the vite dev server
CMD ["npm", "run", "dev"]