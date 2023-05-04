const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.send("Hello there!");
});

router.post('/', function (req, res) {
    res.status(200).json({
        payload: req.body,
        time: + new Date(),
    })
});

module.exports = router;
