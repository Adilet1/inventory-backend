CREATE TABLE employees (
    ID SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    patronymic VARCHAR(255) NOT NULL
);

CREATE TABLE devices (
    ID SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL REFERENCES employees(ID),
    title VARCHAR(255) NOT NULL,
    price NUMERIC NOT NULL
);

INSERT INTO employees (first_name, last_name, patronymic) VALUES ('Иван', 'Иванов', 'Иванович');
INSERT INTO employees (first_name, last_name, patronymic) VALUES ('Петр', 'Петров', 'Петрович');
INSERT INTO employees (first_name, last_name, patronymic) VALUES ('Михаил', 'Михаилов', 'Михаилович');

INSERT INTO devices (employee_id, title, price) VALUES (1, 'Ноутбук', 450000);
INSERT INTO devices (employee_id, title, price) VALUES (1, 'Смартфон', 350000);
INSERT INTO devices (employee_id, title, price) VALUES (2, 'Планшет', 200000);
