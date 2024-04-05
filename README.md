# Source

## Use the new database

USE swapi;

## Create a new table

CREATE TABLE `person` (
`id` int(11) NOT NULL,
`name` varchar(255) DEFAULT NULL,
`height` varchar(255) DEFAULT NULL,
`mass` varchar(255) DEFAULT NULL,
`hair_color` varchar(255) DEFAULT NULL,
`skin_color` varchar(255) DEFAULT NULL,
`eye_color` varchar(255) DEFAULT NULL,
`birth_year` varchar(255) DEFAULT NULL,
`gender` varchar(255) DEFAULT NULL,
`homeworld` varchar(255) DEFAULT NULL,
`films` text DEFAULT NULL,
`species` text DEFAULT NULL,
`vehicles` text DEFAULT NULL,
`starships` text DEFAULT NULL,
`created` varchar(255) DEFAULT NULL,
`edited` varchar(255) DEFAULT NULL,
`url` varchar(255) DEFAULT NULL
)

## Insert some data into the table

INSERT INTO `person` (`id`, `name`, `height`, `mass`, `hair_color`, `skin_color`, `eye_color`, `birth_year`, `gender`, `homeworld`, `films`, `species`, `vehicles`, `starships`, `created`, `edited`, `url`) VALUES
(1, 'Luke Skywalker', '172', '77', 'blond', 'fair', 'blue', '19BBY', 'male', 'https://swapi.dev/api/planets/1/', 'https://swapi.dev/api/films/1/,https://swapi.dev/api/films/2/,https://swapi.dev/api/films/3/,https://swapi.dev/api/films/6/', '', 'https://swapi.dev/api/vehicles/14/,https://swapi.dev/api/vehicles/30/', 'https://swapi.dev/api/starships/12/,https://swapi.dev/api/starships/22/', '2014-12-09T13:50:51.644000Z', '2014-12-20T21:17:56.891000Z', 'https://swapi.dev/api/people/1/'),
(5, 'Darth Vader', '202', '136', 'none', 'white', 'yellow', '41.9BBY', 'male', 'https://swapi.dev/api/planets/1/', 'https://swapi.dev/api/films/1/,https://swapi.dev/api/films/2/,https://swapi.dev/api/films/3/,https://swapi.dev/api/films/6/', '', '', 'https://swapi.dev/api/starships/13/', '2014-12-10T15:18:20.704000Z', '2014-12-20T21:17:50.313000Z', 'https://swapi.dev/api/people/4/');

## Add a primary key

ALTER TABLE `person`
ADD PRIMARY KEY (`id`);

# Properties

Host: localhost:3306
Database: swapi

# Install & Deploy

### install dependencies

```bash
npm install
```

### start in development mode

```bash
npm run dev
```

### deploy to AWS

```bash
serverless deploy
```

# API LOCAL

[http://localhost:3000/dev/swapi/person/{id}](http://localhost:3000/dev/swapi/person/{id})

#### Description

this endpoint get a person from SWAPI

| Properties | Value |
| ---------- | ----- |
| id         | 1     |
| HTTP Code  | 200   |

#### Reponse

````json
{
"nombre": "C-3PO",
"altura": "167",
"masa": "75",
"color_de_cabello": "n/a",
"color_de_piel": "gold",
"color_de_ojos": "yellow",
"año_de_nacimiento": "112BBY",
"genero": "n/a",
"planeta_natal": "https://swapi.dev/api/planets/1/",
"peliculas": [
"https://swapi.dev/api/films/1/",
"https://swapi.dev/api/films/2/",
"https://swapi.dev/api/films/3/",
"https://swapi.dev/api/films/4/",
"https://swapi.dev/api/films/5/",
"https://swapi.dev/api/films/6/"
],
"especies": [
"https://swapi.dev/api/species/2/"
],
"vehículos": [],
"naves_estelares": [],
"creado": "2014-12-10T15:10:51.357000Z",
"editado": "2014-12-20T21:17:50.309000Z"
}```

````

### GET Get Person from SWAPI

[http://localhost:3000/dev/swapi/person/{id}](http://localhost:3000/dev/swapi/person/{id})

#### Description

this endpoint get a person from SWAPI

| Properties | Value |
| ---------- | ----- |
| id         | 1     |
| HTTP Code  | 200   |

#### Reponse

````json
{
"nombre": "C-3PO",
"altura": "167",
"masa": "75",
"color_de_cabello": "n/a",
"color_de_piel": "gold",
"color_de_ojos": "yellow",
"año_de_nacimiento": "112BBY",
"genero": "n/a",
"planeta_natal": "https://swapi.dev/api/planets/1/",
"peliculas": [
"https://swapi.dev/api/films/1/",
"https://swapi.dev/api/films/2/",
"https://swapi.dev/api/films/3/",
"https://swapi.dev/api/films/4/",
"https://swapi.dev/api/films/5/",
"https://swapi.dev/api/films/6/"
],
"especies": [
"https://swapi.dev/api/species/2/"
],
"vehículos": [],
"naves_estelares": [],
"creado": "2014-12-10T15:10:51.357000Z",
"editado": "2014-12-20T21:17:50.309000Z"
}```

````

### GET Persons SWAPI In Database

[http://localhost:3000/dev/swapi/persons](http://localhost:3000/dev/swapi/persons)

#### Description

this endpoint get a person from SWAPI in database

#### Reponse

````json
[
{
"nombre": "Luke Skywalker",
"altura": "172",
"masa": "77",
"color_de_cabello": "blond",
"color_de_piel": "fair",
"color_de_ojos": "blue",
"año_de_nacimiento": "19BBY",
"genero": "male",
"planeta_natal": "https://swapi.dev/api/planets/1/",
"peliculas": [
"https://swapi.dev/api/films/1/",
"https://swapi.dev/api/films/2/",
"https://swapi.dev/api/films/3/",
"https://swapi.dev/api/films/6/"
],
"especies": [
""
],
"vehículos": [
"https://swapi.dev/api/vehicles/14/",
"https://swapi.dev/api/vehicles/30/"
],
"naves_estelares": [
"https://swapi.dev/api/starships/12/",
"https://swapi.dev/api/starships/22/"
],
"creado": "2014-12-09T13:50:51.644000Z",
"editado": "2014-12-20T21:17:56.891000Z"
},
{
"nombre": "Darth Vader",
"altura": "202",
"masa": "136",
"color_de_cabello": "none",
"color_de_piel": "white",
"color_de_ojos": "yellow",
"año_de_nacimiento": "41.9BBY",
"genero": "male",
"planeta_natal": "https://swapi.dev/api/planets/1/",
"peliculas": [
"https://swapi.dev/api/films/1/",
"https://swapi.dev/api/films/2/",
"https://swapi.dev/api/films/3/",
"https://swapi.dev/api/films/6/"
],
"especies": [
""
],
"vehículos": [
""
],
"naves_estelares": [
"https://swapi.dev/api/starships/13/"
],
"creado": "2014-12-10T15:18:20.704000Z",
"editado": "2014-12-20T21:17:50.313000Z"
}
]```



````

### POST Save Person SWAPI In Database

[http://localhost:3000/dev/swapi/person](http://localhost:3000/dev/swapi/person)

#### Description

this endpoint save a person from SWAPI in database

Body:

```json
{
  "id": 1
}
```

| Properties | Value | description         |
| ---------- | ----- | ------------------- |
| id         | 1     | param               |
| HTTP Code  | 200   | status code success |

#### Reponse

```json
{
  "response": {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 5,
    "serverStatus": 2,
    "warningCount": 0,
    "message": "",
    "protocol41": true,
    "changedRows": 0
  }
}
```
