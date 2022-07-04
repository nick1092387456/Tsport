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

const db = require('./app/models')
db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Drop and re-sync db.')
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message)
  })

//simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my application.' })
})

require('./app/routes/tutorial.routes')(app)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
