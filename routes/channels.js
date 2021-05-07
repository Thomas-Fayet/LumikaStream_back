var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var { v4: uuidv4 } = require('uuid');
var Channel = require('../models/Channel');
var bodyParser = require("body-parser");

// Listing of all channels
router.get('/', async (req, res, next) => {
    res.json(await mongoose.model('Channel').find({}));
});

// Listing of user channels
router.get('/:user', async (req, res, next) => {
    res.json(await mongoose.model('Channel').find(req.params.id));
});

// Create a channel

//router.post('/', userController.createChannel);

router.post('/', (req,res,next) => {
    var stream_key = uuidv4();
    var channel = new Channel ({
        title: req.body.title,
        status: false,
        stream_key,
        user: req.body.user
    });
    channel.save()
        .then(() => res.status(201).json({ stream_key }))
        .catch(error => res.status(400).json({ error})); 
});



module.exports = router;