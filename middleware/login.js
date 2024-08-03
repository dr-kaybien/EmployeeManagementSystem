const bcrypt = require('bcrypt');
const Employee = require('../model/employee.model');
const authenticate = async (req, res, next) => {
    const email = req.header("email");
    const password = req.header("password");
    
    if (!email || !password) {
        res.status(401).json({ error: 'Login detail(s) missing' });
        return;
    }
    try {
        bcrypt.compare(password, hash, (err, result) => {
            if (err) {
                // Handle error
                console.log("Error:", err)
                res.status(401).json('Error comparing passwords:', err);
                return;
            }
        if (result) {
            res.status(200).json("Password correct");
            next();
        }else{
            return res.status(401).json("Password incorrect");
        }
    })
    } catch (error) {
        next(error);
    }
    if (email != employee.email){
        return res.status(401).json("Email incorrect")
    }else{
        res.status(200).json("Email correct");
        next();
    }
}

module.exports = authenticate;