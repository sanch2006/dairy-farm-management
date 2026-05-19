const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());


// DATABASE CONNECTION

const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dairyfarm'

});


// CONNECT DATABASE

db.connect((err) => {

    if(err){

        console.log('Database Connection Failed');
        console.log(err);

    }

    else{

        console.log('Database Connected Successfully');

    }

});


// API FOR REGISTERING LIVESTOCK

app.post('/register', (req, res) => {

    const {

        cowid,
        breed,
        milk,
        health

    } = req.body;


    const sql =
    'INSERT INTO livestock(cowid, breed, milk, health) VALUES (?, ?, ?, ?)';


    db.query(

        sql,

        [cowid, breed, milk, health],

        (err, result) => {

            if(err){

                console.log(err);

                res.json({

                    success: false,
                    message: 'Database Error'

                });

            }

            else{

                res.json({

                    success: true,
                    message: 'Livestock Registered Successfully'

                });

            }

        }

    );

});


// START SERVER

app.listen(5000, () => {

    console.log('Server running on port 5000');

});