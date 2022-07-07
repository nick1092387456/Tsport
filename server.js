const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const corsOptions = {
  origin: 'http://localhost:8081',
}
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// const db = require('./app/models')
const db = require('./models')
const roles = require('./models/roles')
db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Drop and re-sync db.')
    initial()
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message)
  })

function initial() {
  roles.create({
    id: 1,
    name: 'user',
  })
  roles.create({
    id: 2,
    name: 'athlete',
  })
  roles.create({
    id: 3,
    name: 'admin',
  })
  roles.create({
    id: 4,
    name: 'coach',
  })
}

//simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my application.' })
})

require('./app/routes/tutorial.routes')(app)
require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
