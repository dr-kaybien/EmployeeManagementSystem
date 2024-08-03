const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
   firstName: {
    type: String,
    required: true,
   } ,
   lastName: {
    type: String,
   } ,
   middleName: {
    type: String,
    required: true,
   } ,
   phoneNo: {
    type: Number,
    required: true,
    unique: true
   } ,
   email: {
    type: String,
    required: true,
    unique: true
   } ,
   password: {
    type: String,
    required: true,
    unique: true
   } ,
   token:{
    type: String
   }
},
    {
        timestamps: true
    }
);

const Employee = mongoose.model('employee', EmployeeSchema);

module.exports = Employee;