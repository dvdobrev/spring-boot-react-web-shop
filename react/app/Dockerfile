# Use an official Node.js runtime as the base image
FROM node:17-alpine

# Set the working directory
WORKDIR /app

# Copy the React app's package.json and package-lock.json
COPY package*.json ./

# Install app-level dependencies
RUN npm install && npm install axios && npm install react-multi-carousel

# Copy the rest of the app's source code
COPY . . 

# Expose the port your React app will run on (usually 3000)
EXPOSE 3000

# Command to run your React app
CMD ["npm", "start"]
