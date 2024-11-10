# Use Node.js for building the project
FROM node:18-alpine 

# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json .
RUN npm install

# Copy the rest of the app source code
COPY . ./


# Install ts-node for running TypeScript files directly
# RUN npm install -g ts-node
# RUN npm install -g ts-node
RUN npm install -g typescript
# RUN tsc
RUN npm run build

# Expose the frontend port (e.g., 5173)
EXPOSE 5173

# Start Node
# CMD ["node", "dist/app.js"]
# CMD ["ts-node", "main.tsx"]
ENTRYPOINT ["tail", "-f", "/dev/null"]
