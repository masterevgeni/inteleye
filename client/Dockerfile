# # Step 1: Build the application
# FROM node:18 AS build

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json (or yarn.lock)
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Build the application
# RUN npm run build

# # Step 2: Serve the application
# FROM nginx:alpine

# # Copy the build output to the Nginx html directory
# COPY --from=build /app/build /usr/share/nginx/html

# # Expose port 3000
# EXPOSE 3000

# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]

# Use the official Node.js 16 image as the base image
FROM node:latest
# FROM node:lts-alpine as build
# RUN mkdir -p /usr/src/app
# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
# COPY package.json /usr/src/app/

# Install dependencies
RUN rm *lock*.*
RUN npm install
# RUN npm ci

# ADD src /usr/src/app/src
# ADD public /usr/src/app/public

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]



# FROM node:latest
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app
# COPY package.json /usr/src/app/
# RUN npm install
# ADD src /usr/src/app/src
# ADD public /usr/src/app/public
# EXPOSE 3000
# CMD ['npm', 'start']