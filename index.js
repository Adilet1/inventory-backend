const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { pool } = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const getEmployees = (request, response) => {
    pool.query(`SELECT employees.id, employees.first_name, employees.last_name, employees.patronymic, devices.devices_count, devices.devices_price FROM employees FULL OUTER JOIN (SELECT employee_id, COUNT(id) AS devices_count, SUM(price) AS devices_price FROM devices GROUP BY devices.employee_id) devices ON employees.id = devices.employee_id;`, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const addEmployee = (request, response) => {
    const firstName = request.body.first_name;
    const lastName = request.body.last_name;
    const patronymic = request.body.patronymic;
    pool.query(`INSERT INTO employees (first_name, last_name, patronymic) VALUES ('${firstName}', '${lastName}', '${patronymic}');`, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getEmployee = (request, response) => {
    const id = request.params.id;
    pool.query(`SELECT * FROM employees WHERE id = ${id};`, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const editEmployee = (request, response) => {
    const id = request.params.id;
    const firstName = request.body.first_name;
    const lastName = request.body.last_name;
    const patronymic = request.body.patronymic;
    pool.query(`UPDATE employees SET first_name = '${firstName}', last_name = '${lastName}', patronymic = '${patronymic}' WHERE id = ${id};`, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const deleteEmployee = (request, response) => {
    const id = request.params.id;
    pool.query(`DELETE FROM employees WHERE id = ${id};`, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getEmployeeDevices = (request, response) => {
    const id = request.params.id;
    pool.query(`SELECT * FROM devices WHERE employee_id = ${id};`, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const addEmployeeDevices = (request, response) => {
    const id = request.params.id;
    const title = request.body.title;
    const price = request.body.price;
    pool.query(`INSERT INTO devices (employee_id, title, price) VALUES (${id}, '${title}', ${price});`, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getDevice = (request, response) => {
    const id = request.params.id;
    pool.query(`SELECT * FROM devices WHERE id = ${id};`, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const editDevice = (request, response) => {
    const id = request.params.id;
    const title = request.body.title;
    const price = request.body.price;
    pool.query(`UPDATE devices SET title = '${title}', price = ${price} WHERE id = ${id};`, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const deleteDevice = (request, response) => {
    const id = request.params.id;
    pool.query(`DELETE FROM devices WHERE id = ${id};`, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

app
  .route('/employees')
  .get(getEmployees)
  .post(addEmployee);

app
  .route('/employee/:id')
  .get(getEmployee)
  .put(editEmployee)
  .delete(deleteEmployee);

app
  .route('/employee/:id/devices')
  .get(getEmployeeDevices)
  .post(addEmployeeDevices);

app
  .route('/devices/:id')
  .get(getDevice)
  .put(editDevice)
  .delete(deleteDevice);

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server listening`)
});
