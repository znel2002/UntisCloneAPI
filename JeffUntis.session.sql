
-- @block
CREATE DATABASE untisclone;

-- @block
CREATE TABLE untisclone.school (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL
);

-- Add homework table
-- connect



-- @block
DROP TABLE untisclone.school;

-- @block
INSERT INTO untisclone.school ( name, url) VALUES ( 'JeffUntis', 'https://jeffuntis.com');

-- @block
SELECT * FROM untisclone.school;

-- @block
DELETE FROM untisclone.school WHERE name = 'JeffUntis';

-- @block
INSERT INTO untisclone.school (name, url, address) VALUES ('dathe-gymnasium', 'nessa.webuntis.com', 'Helsingforser Str. 11, 10243 Berlin');



-- @block
CREATE TABLE untisclone.user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    school_id INT NOT NULL,
    FOREIGN KEY (school_id) REFERENCES untisclone.school(id)
);

-- @block
DROP TABLE untisclone.user;

-- @block
INSERT INTO untisclone.user (name, password, school_id) VALUES ('HarreKim','Coco2014!', 1);

-- @block
SELECT * FROM untisclone.user;

-- @block
CREATE TABLE untisclone.homework (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    formattedDay INT NOT NULL,
    lesson_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES untisclone.user(id)
);

-- @block
DROP TABLE untisclone.homework;

-- @block
INSERT INTO untisclone.homework (name, description, date, user_id, lesson_id) VALUES ('Math', 'Do the math homework', '2021-06-01', 1, 40064);
INSERT INTO untisclone.homework (name, description, date, user_id, lesson_id) VALUES ('English', 'Do the english homework', '2021-06-01', 1, 40064);

-- @block
INSERT INTO untisclone.homework (name, description, formattedDay, user_id, lesson_id) VALUES ('English', 'Do the english homework', '20240507', 1, 40064);


-- @block
SELECT * FROM untisclone.homework WHERE user_id = 1;