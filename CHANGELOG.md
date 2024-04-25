# Changelog

## 1.0.1 - 2024 - 04 - 24
___

### Sprint learnings

- Básicos de SQL (Subqueries, inner join)
- Conceptos básicos de documentación y swagger
- Conceptos sobre test unitarios y test integradores
 
>  SQL Basics  (Subqueries, inner join)
>  Documentation and swagger basics
>  Concepts about unit and integrative testing
___
### Added

- Función del endpoint /trajectories/lastest 
- Carpeta designada para los test 
- Script para iniciar los test
- Documentación básica de los endpoints en swagger 

>  Endpoint /trajectories/lastest
>  Designated test folder
>  Script to start tests  
>  Basic endpoint documentation in swagger   
___
### Changed

- El GET de /trajectories trabaja ahora con QueryParams
- La función de GET /trajectories se nombró getTrajectoriesFilter

>  GET /trajectories now works with QueryParams
>  GET /trajectories function is now called getTrajectoriesFilter 
___
### Fixed

- Se unificó el endpoint de GET /trajectories en una sola función

> GET /trajectories endpoint unified into a single function
___
### Removed

No se ha eliminado ningún archivo / funcionalidad

> No file / functionality has been removed

---

## 1.0.0 - 2024 - 04 - 16
___

### Sprint learnings

- Estructuras de consultas básicas a través de prisma (CRUD)
- Básicos de SQL
- Manejo de DBeaver como mi gestor de base de datos

>  Basic Query Structures Prisma (CRUD)  
>  SQL Basics  
>  DBeaver as my database manager  
___
### Added

- Rutas de trayectorias
- Rutas de taxis
- Funciones en controllers de taxis
- Funciones en controllers de trayectorias 

>  Trajectories routes  
>  Taxis routes  
>  Functions in taxis controllers  
>  Functions in trajectories controllers    
___
### Changed

- Código de estado al crear un taxi (201)
- Código de estado al crear una trayectoria (201)

>  Status code when creating a taxi (201)  
>  Status code when creating a trajectory (201)  
___
### Fixed

No se han realizado correcciones

> No fixes have been made
___
### Removed

No se ha eliminado ningún archivo / funcionalidad

> No file / functionality has been removed
