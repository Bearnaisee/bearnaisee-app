# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:16-alpine as builder 
WORKDIR /app
COPY package.json /app/
RUN npm install --quiet
COPY ./ /app/
RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:latest
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
