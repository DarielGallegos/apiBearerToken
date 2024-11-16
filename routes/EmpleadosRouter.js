const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const employeeController = require('../controllers/EmpleadosCtrl.js');

router
.get("/", employeeController.getAllEmployee)
//Path Variable -> no Query Param
.get("/:employee_id", employeeController.getOneEmployee)
.post("/", bodyParser.json(), employeeController.createNewEmployee)
.put("/:employee_id", bodyParser.json(), employeeController.updateEmployee)
.delete("/:employee_id", employeeController.deleteOneEmployee);
module.exports = router;