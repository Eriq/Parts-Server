const express = require('express');
const router = express.Router();
const client = require('./db-config');

 //Get all partgroups
router.get('/', (req, res) => {

    client.connect();

    const query = 'SELECT * FROM partgroup';
    
    // callback
    client.query(query, (err, result) => {
        if (err) {
        console.log(err.stack);
        } else {
        res.send(result.rows);
        }
        client.end();
    });
});

module.exports = router;