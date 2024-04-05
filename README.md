-- Create a new database
CREATE DATABASE IF NOT EXISTS swapi;

-- Use the new database
USE swapi;

-- Create a new table
CREATE TABLE IF NOT EXISTS person  (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    altura INT,
    masa INT,
    color_de_cabello VARCHAR(255),
    color_de_piel VARCHAR(255),
    color_de_ojos VARCHAR(255),
    año_de_nacimiento VARCHAR(255),
    genero VARCHAR(255),
    planeta_natal VARCHAR(255),
    peliculas TEXT, 
    especies TEXT,
    vehículos TEXT,
    naves_estelares TEXT,
    creado DATETIME,
    editado DATETIME
);

-- Insert some data into the table
INSERT INTO persons (nombre, altura, masa, color_de_cabello, color_de_piel, color_de_ojos, año_de_nacimiento, genero, planeta_natal, peliculas, vehículos, naves_estelares, creado, editado)
VALUES (
    'Luke Skywalker', -- nombre
    172, -- altura
    77, -- masa
    'blond', -- color_de_cabello
    'fair', -- color_de_piel
    'blue', -- color_de_ojos
    '19BBY', -- año_de_nacimiento
    'male', -- genero
    'https://swapi.dev/api/planets/1/', -- planeta_natal
    '["https://swapi.dev/api/films/1/", "https://swapi.dev/api/films/2/", "https://swapi.dev/api/films/3/", "https://swapi.dev/api/films/6/"]', -- peliculas
    '["https://swapi.dev/api/vehicles/14/", "https://swapi.dev/api/vehicles/30/"]', -- vehículos
    '["https://swapi.dev/api/starships/12/", "https://swapi.dev/api/starships/22/"]', -- naves_estelares
    '2014-12-09 13:50:51', -- creado 
    '2014-12-20 21:17:56' -- editado 
);
