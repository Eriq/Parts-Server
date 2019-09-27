const express = require('express');
const router = express.Router();
const client = require('./db-config');

 //Get all vehicle makes
router.get('/', (req, res) => {

    client.connect();

    const query = 'SELECT code, make, logo FROM vehicle';
    
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

//Get single make
router.get('/:make', (req, res) => {

    client.connect();

    const query = {
        text: 'SELECT * FROM vehicle WHERE make=$1',
        values: [req.params.make]
    };
    
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

//Get all vehicle models
router.get('/models', (req, res) => {

});

//Get single model
router.get('/models/:make', (req, res) => {
    client.connect();

    const query = {
        text: 'SELECT t1.family, t1.modelcode FROM model as t1 RIGHT JOIN vehicle AS t2 ON t2.code = t1.vehicle WHERE t2.make=$1',
        values: [req.params.make]
    };
    
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