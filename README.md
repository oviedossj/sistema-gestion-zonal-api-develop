#sistema-gestion-zonal-api-develop

## Descripción
Este proyecto es una API para la gestión de incidentes en barrios. Está desarrollado con Node.js y TypeScript.

## Instalación

### Requisitos Previos
- Node.js (versión LTS recomendada)
- npm (generalmente incluido con Node.js)

### Clonar el Repositorio
```bash
git clone https://github.com/tu_usuario/wai-sistema-gestion-zonal-api-develop.git
cd wai-sistema-gestion-zonal-api-develop
```

### Instalar Dependencias
```bash
npm install
```

## Scripts Disponibles

### Desarrollo
```bash
npm run dev
```
Ejecuta la aplicación en modo desarrollo. Usa `nodemon` para recargar automáticamente los cambios.

### Compilar el Proyecto
```bash
npm run build
```
Compila el proyecto usando `tsc` (TypeScript Compiler).

### Linter
```bash
npm run lint
```
Ejecuta ESLint para comprobar el código. 

```bash
npm run lint:fix
```
Ejecuta ESLint y corrige automáticamente los problemas que encuentra.

### Formateo con Prettier
```bash
npm run prettier:code-check
```
Verifica el formato del código con Prettier.

```bash
npm run prettier:fix
```
Formatea el código con Prettier.

### Pruebas
```bash
npm run test
```
Ejecuta las pruebas con Jest.

```bash
npm run test:coverage
```
Ejecuta las pruebas y genera un informe de cobertura.

### Producción
```bash
npm run server:prod
```
Compila el proyecto y ejecuta el servidor en modo producción.

```bash
npm run server:prod:docker
```
Ejecuta el servidor en modo producción preparado para Docker.

## Docker

### Construir y Ejecutar con Docker

#### BUILDER STAGE
```dockerfile
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
```

#### LAUNCHER SERVER STAGE
```dockerfile
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
```

### Construir la Imagen de Docker
```bash
docker build -t wai-sistema-gestion-zonal-api .
```

### Ejecutar el Contenedor de Docker
```bash
docker run -p 8080:8080 wai-sistema-gestion-zonal-api
```

## Autor
Ovitec

## Licencia
ISC
```

Este README proporciona una guía clara sobre cómo instalar y usar el proyecto, así como instrucciones para construir y ejecutar el contenedor Docker. Si necesitas más detalles o ajustes, no dudes en avisarme.
