const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@12345@localhost:5432/postgres';

// const client = new pg.Client(connectionString);
// client.connect();
pg.connect(connectionString, (err, client, done) => {

    const query = client.query('SELECT * FROM CUSTOMERS ORDER BY customerid ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
        //results.push(row);
        console.log(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
        done();
        console.log('Done')
        //return res.json(results);
    });
});

