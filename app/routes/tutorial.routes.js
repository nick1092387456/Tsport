module.exports = (app) => {
  const tutorials = require('../controllers/toturial.controller.js')
  const router = require('express').Router()
  //Create a new Tutorial
  router.post('/', tutorials.create)
  //Retrieve all Tutorial
  router.get('/', tutorials.findAll)
  //Retrieve all published Tutorials
  router.get('/published', tutorials.findAllPublished)
  //Retrieve a single Tutorials with id
  router.get('/:id', tutorials.findOne)
  //Update a Tutorials with id
  router.put('/:id', tutorials.update)
  //Delete a Tutorials with id
  router.delete('/:id', tutorials.delete)
  //Delete all Tutorials
  router.delete('/', tutorials.deleteAll)
  app.use('/api/tutorials', router)
}
