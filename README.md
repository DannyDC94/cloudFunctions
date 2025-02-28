## CLOUD FUNCTIONS Firebase ExpressJs
# Comentarios sobre el desarrollo
Aplicacion implementada con una arquitectura en capas

Esta arquitectura tiene las siguientes caracteristicas:

Separación de responsabilidades para que cada accion este en su respectiva carpeta

Entre las capas principales se tiene

config: Archivo de configuracion inicial

controllers: Logica de datos

routes: Rutas para cada endpoint GET, POST, PUT, DELETE

services: Conexion con la base de datos

types: Interfaces de tareas y usuarios

# Execute
firebase emulators:start

Node version 22.12.0


# Build
Run npm run build to build the project.