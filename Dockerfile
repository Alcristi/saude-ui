
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Build arguments
ARG API_URL
ENV API_URL=$API_URL

# Install dependencies
RUN npm install --ignore-scripts

COPY . .

# Build the application
RUN npx quasar prepare
RUN npm run build

FROM nginx:alpine

# Copy the built files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Custom Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
