# BUILDER STAGE
FROM node:lts-alpine AS builder

# Check node version
RUN node --version

# Set workdir
WORKDIR /build

# Copy code to the container
COPY . /build

# Install dependencies and build application
RUN npm install
RUN npm run build

# LAUNCHER SERVER STAGE
FROM node:lts-alpine

# Set environment variables
ENV DIR_SWAGGER='./dist/src/config/docs/swagger.yml'
ENV DIR_ERROR='./dist/src/config/handler/error.yml'
ENV PORT=8080

# Set workdir
WORKDIR /usr/src/app

# Check node version
RUN node --version

# Install tini and change permissions
RUN apk add --no-cache tini \
    && chown node:node /usr/src/app 

# Copy built artifacts from builder stage
COPY --chown=node:node --from=builder /build/dist dist
COPY --chown=node:node --from=builder /build/package.json package.json
COPY --chown=node:node --from=builder /build/node_modules node_modules
COPY --chown=node:node --from=builder /build/tsconfig.json tsconfig.json
COPY --chown=node:node --from=builder /build/src/config/handler/error.yml dist/src/shared/handler/error.yml
COPY --chown=node:node --from=builder /build/src/config/docs dist/src/shared/docs

# Ensure .env file exists
RUN touch dist/.env

# Change to non-root user
USER node 

# Create logs directory and symlink logs to stdout
RUN mkdir -p /usr/src/app/logs \
    && ln -sf /dev/stdout /usr/src/app/logs/server.log

# Set workdir to dist
WORKDIR /usr/src/app/dist

# Set entrypoint
ENTRYPOINT ["tini", "--"]

# Set command to run the server
CMD ["npm", "run", "server:prod:docker"]
