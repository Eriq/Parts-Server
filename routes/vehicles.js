const express = require('express');
const router = express.Router();
const client = require('./db-config');

 //Get all vehicle makes
router.get('/', (req, res) => {

    client.connect();

    const query = 'SELECT * FROM vehicle';
    
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

//Get all year_prod of a model
router.get('/yearprod/:modelcode', (req, res) => {
    client.connect();

    const query = {
        text: 'SELECT t1.name, t1.value FROM year_prod as t1 RIGHT JOIN model AS t2 ON t1.model = t2.id RIGHT JOIN vehicle AS t3 ON t2.vehicle = t3.code WHERE t2.modelcode=$1',
        values: [req.params.modelcode]
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


//Get all series of a model
router.get('/series/:modelcode/:name/:value', (req, res) => {
    client.connect();

    const query = {
        text: 't1.market FROM series as t1 RIGHT JOIN year_prod AS t2 ON t1.year_prod = t2.id RIGHT JOIN model AS t3 ON t2.model = t3.id RIGHT JOIN vehicle AS t4 ON t3.vehicle = t4.code WHERE t2.name=$1 AND t2.value=$2 AND t3.modelcode=$3',
        values: [req.params.name, req.params.value, req.params.modelcode]
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