//Get Single part by partcode
router.get('/:partcode', (req, res) => {

    client.connect();

    const query = {
        text: 'SELECT t3.make, t4.family, t2.group_name, t1.part_code, t1.part_name, FROM part AS t1 RIGHT JOIN partgroup AS t2 ON t1.partgroup = t2.group_name  RIGHT JOIN vehicle AS t3 ON t1.vehicle=t3.code RIGHT JOIN model AS t4 ON t1.modelcode=t4.modelcode WHERE t1.part_code=$1',
        values: [req.params.partcode]
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


//Get parts 
router.get('/', (req, res) => {

    partgroup = req.query.partgroup;
    series = req.query.series;
    yearprod = req.query.yearprod;
    model = req.query.model;
    make = req.query.make;

    client.connect();

    const query = '';
    
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
