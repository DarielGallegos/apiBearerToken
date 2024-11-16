const mysql = require('mysql')

const connect = mysql.createConnection({
    host: 'localhost',
    user : 'hangmanJS',
    password: 'hangman',
    database: 'apiJWT'
})

const getConnection = () => {
    return connect;
}

module.exports = {
    getConnection
}