CREATE DATABASE swapi;

USE swapi;

CREATE TABLE `person` (
`id` int AUTO_INCREMENT PRIMARY KEY,
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
);

INSERT INTO `person` ( `name`, `height`, `mass`, `hair_color`, `skin_color`, `eye_color`, `birth_year`, `gender`, `homeworld`, `films`, `species`, `vehicles`, `starships`, `created`, `edited`, `url`) VALUES
( 'Luke Skywalker', '172', '77', 'blond', 'fair', 'blue', '19BBY', 'male', 'https://swapi.dev/api/planets/1/', 'https://swapi.dev/api/films/1/,https://swapi.dev/api/films/2/,https://swapi.dev/api/films/3/,https://swapi.dev/api/films/6/', '', 'https://swapi.dev/api/vehicles/14/,https://swapi.dev/api/vehicles/30/', 'https://swapi.dev/api/starships/12/,https://swapi.dev/api/starships/22/', '2014-12-09T13:50:51.644000Z', '2014-12-20T21:17:56.891000Z', 'https://swapi.dev/api/people/1/'),
('Darth Vader', '202', '136', 'none', 'white', 'yellow', '41.9BBY', 'male', 'https://swapi.dev/api/planets/1/', 'https://swapi.dev/api/films/1/,https://swapi.dev/api/films/2/,https://swapi.dev/api/films/3/,https://swapi.dev/api/films/6/', '', '', 'https://swapi.dev/api/starships/13/', '2014-12-10T15:18:20.704000Z', '2014-12-20T21:17:50.313000Z', 'https://swapi.dev/api/people/4/');
