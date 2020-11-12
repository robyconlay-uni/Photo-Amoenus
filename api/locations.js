const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(201).json({
        message : "location was fetched"
    });
});

module.exports = router;
