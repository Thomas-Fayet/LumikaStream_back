var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var userController = require('../controllers/user');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.json(await mongoose.model('User').find({}));
});

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.put('/:id', async (req, res, next) => {
  res.json(await mongoose.model('User').findByIdAndUpdate(req.params.id, req.body));
});

router.delete('/:id' , async (req, res, next) => {
  res.json(await mongoose.model('User').findByIdAndRemove(req.params.id));
});

router.get('/:id', async (req, res, next) => {
  res.json(await mongoose.model('User').findById(req.params.id));
});

module.exports = router;
