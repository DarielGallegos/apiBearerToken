const { getConnection } = require('../repository/bd.js')
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
    const connection = await getConnection();
    const { username, password } = req.query;
    connection.query(`CALL getAccess('${username}', '${password}')`, (err, result, fld) => {
        if(result[0].length > 0){
            const token = jwt.sign({username: username }, "Tokent", { expiresIn: 10*60},(err, token) => {
                token ? res.status(200).json({status: true, token: token}) : res.status(404).json({staus: true, token: ""})
            })
        }
    })
}

module.exports = {
    login
}