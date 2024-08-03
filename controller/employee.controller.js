const Employee = require("../model/employee.model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const saltRounds = 10;
bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
        return;
    }
});

module.exports = {
    signup: async (req, res) => {
        try {
            const employee = req.body;
            const newEmployee = new Employee(employee);
            const accessToken = jwt.sign(
                {EmployeeId: employee._id } , 
                process.env.JWT_SECRET, 
                {expiresIn: "1h"});
            newEmployee.token = accessToken
            const password = employee.password;
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    return;
                }
                newEmployee.hash = hash;
            })
            
            newEmployee.save();
            res.json({
                data: newEmployee
            })
        } catch (error) {
            console.log("Error:", error);
            res.status(500).json({error});
        }
    },
update: async (req, res, next) => {
        try {
            const data = req.body;
            const id = req.params.id;
            const employee = await Employee.findByIdAndUpdate(id, data);
            res.status(200).json({
                data: employee,
                message: "Employee updated"
            })
        } catch (error) {
            next(error);
            console.log("Error:", error)
        }
    },
fetchAllEmployees: async (req, res, next)=>{
        try {
            const employees = await Employee.find({});
            res.status(200).json({
                data: employees
            })
        } catch (error) {
            next(error)
        }
    },
fetchEmployeeById: async (req, res, next)=>{
        try {
            const id = req.params.id;
            const employee = await Employee.findById(id);
            if(!employee) return next(new Error("Employee not found"))
            res.status(200).json({
                data: employee
            })
        } catch (error) {
            next(error)
        }
    },
deleteEmployee: async (req, res, next) => {
    try {
    const employeeId = req.params.employeeId;
    await Employee.findByIdAndDelete(employeeId);
    res.status(200).json({
      data: null,
      message: 'Employee has been deleted'
    });
    } catch (error) {
    next(error)
    }
}
}
