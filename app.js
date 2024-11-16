const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 8080


//Routes
const routerEmployee = require('./routes/EmpleadosRouter.js')
const routerLogin = require('./routes/LoginRouter.js')

// Middleware
app.use("/empleados/", routerEmployee)
app.use("/auth/", routerLogin)

app.use("/", (req, res) => {
    res.status(200).json({message: "Welcome to the API"})
});


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())

app.listen(port, () => {
    console.log(`Server funcionando en http://localhost:${port}`)
})