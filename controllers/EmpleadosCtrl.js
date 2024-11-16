const {getConnection} = require("../repository/bd.js")
const jwt = require('jsonwebtoken')

const getAllEmployee = async (req, res) => {
    const header = req.headers['authorization'];
    const token = header.split(' ')[1];
    const connection = await getConnection();
    jwt.verify(token, 'Tokent', (err, decoded) => {
        if(err){
            res.status(403).json({message: "Token is not valid"})
            return;
        }
        connection.query("SELECT * FROM empleados", (err, result, fld) => {
            if(err){
                console.log(err)
                return;
            }
            res.json(result)
        })        
    })
}

const getOneEmployee = async (req, res) => {
    const connection = await getConnection();
    const {employee_id} = req.params;
    const header = req.headers['authorization'];
    const token = header.split(' ')[1];
    jwt.verify(token, 'Tokent', (err, decoded) => {
        if(err){
            res.status(403).json({message: "Token is not valid"})
            return;
        }
        connection.query(`SELECT * FROM empleados WHERE id = ${employee_id}`, (err, result, fld) => {
            if(err){
                console.log(err)
                return;
            }
            res.json(result)
        })    
    })
}

const createNewEmployee = async (req, res) => {
    const { nombre, fecha, cedula, telefono, direccion } = req.body;
    const connection = await getConnection();
    const header = req.headers['authorization'];
    const token = header.split(' ')[1];

    jwt.verify(token, 'Tokent', (err, decoded) => {
        if(err){
            res.status(403).json({message: "Token is not valid"})
            return;
        }
        connection.query(`INSERT INTO empleados(nombre, fecha, cedula, telefono, direccion) VALUES('${nombre}', '${fecha}', '${cedula}', '${telefono}', '${direccion}')`, (err, result, fld) => {
            if(err){
                console.log(err)
                return;
            }
            res.json({message: "Employee created successfully"})
        })    
    })
}

const deleteOneEmployee = async (req, res) => {
    const connection = await getConnection();
    const {employee_id} = req.params;
    const header = req.headers['authorization'];
    const token = header.split(' ')[1];

    jwt.verify(token, 'Tokent', (err, decoded) => {
        if(err){
            res.status(403).json({message: "Token is not valid"})
            return;
        }
        connection.query(`DELETE FROM empleados WHERE id = ${employee_id}`, (err, result, fld) => {
            if(err){
                console.log(err)
                return;
            }
            res.json({message: "Employee deleted successfully"})
        })    
    })
}

const updateEmployee = async (req, res) => {
    const { nombre, fecha, cedula, telefono, direccion } = req.body;
    const {employee_id} = req.params;
    const header = req.headers['authorization'];
    const token = header.split(' ')[1];
    const connection = await getConnection();
    jwt.verify(token, 'Tokent', (err, decoded) => {
        if(err){
            res.status(403).json({message: "Token is not valid"})
            return;
        }
        connection.query(`UPDATE empleados SET nombre = '${nombre}', fecha = '${fecha}', cedula = '${cedula}', telefono = '${telefono}', direccion = '${direccion}' WHERE id = ${employee_id}`, (err, result, fld) => {
            if(err){
                console.log(err)
                return;
            }
            res.json({message: "Employee updated successfully"})
        })    
    })
}

module.exports = {
    getAllEmployee,    
    getOneEmployee,
    createNewEmployee,
    deleteOneEmployee,
    updateEmployee
}