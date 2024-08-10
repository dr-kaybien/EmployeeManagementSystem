const express = require('express');
const router = express.Router();
const EmployeeController = require("../controller/employee.controller");
const Authorization = require("../middleware/authorize")
const Login = require("../middleware/login")

router.post("/register", EmployeeController.signup);
router.put("/update/:id", Authorization,  EmployeeController.update);
router.get("/employees", EmployeeController.fetchAllEmployees);
router.get("/employeeById/:id", EmployeeController.fetchEmployeeById);
router.delete("/employeeById/:id", EmployeeController.deleteEmployee)

module.exports = router;    