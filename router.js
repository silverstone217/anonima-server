const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.setHeader("Access-Control-Allow-Methods", "GET, POST,OPTIONS, DELETE, PUT, PATCH");

    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type")
    return res.json("Hello, world!");
});


module.exports = router;