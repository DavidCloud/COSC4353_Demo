const express = require('express'); //package, use 'npm install express' to get it
const cors = require('cors'); // package, use 'npm install cors' to get it 
const mysql = require('mysql');

// create database connection
const db = mysql.createConnection({
    host     : '192.168.1.2',
    user     : 'user',
    password : '123',
    database : 'COSC 4353'
});

// Connect DB
db.connect(function(error) {
    if(!!error){
        console.log('Error connecting to MySql');
        console.log(error);
    } else {
        console.log('MySql Conected...');
    }
});

const app = express();

app.use(cors());
app.use(express.json());

//keep this for now, but I think we can delete this
app.get('/', (req, res) => 
{
    res.json({
        message: 'Whats up and i can add stuff to this now'
    });
});

//checks to make sure we are sent actual values and not blank forms
function isValidUser(profile)
{
    return profile.user && profile.user.toString().trim() !== '' &&
        profile.password && profile.password.toString().trim() !== '';
}

//this is taking the profile(use,password) from main_page.html and
//going to insert it into a Database
app.post('/profile', (req, res) => 
{
    if(isValidUser(req.body))
    {
        //insert into Database eventually
        const profile = {
            user: req.body.user.toString(),
            pass: req.body.password.toString()
        };
        let sql = "INSERT INTO UserCreds VALUES ('" + profile.user + "', '" + profile.pass + "');";
        db.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result);
        });
        console.log(profile);
    }
    else
    {
        res.status(422);
        res.json({
            messsage: 'User and Password are not valid'
        });
    }
});

app.post('/profile_complete', (req, res) =>
{
    const profile_complete = {
        name: req.body.name.toString(),
        addr1: req.body.addr1.toString(),
        addr2: req.body.addr2.toString(),
        city: req.body.city.toString(),
        state: req.body.state.toString(),
        zipcode: req.body.zipcode.toString(),
    };
    let sql = "INSERT INTO ClientInfo VALUES ('" + profile_complete.name + "', '"
        + profile_complete.addr1 + "', '" + profile_complete.addr2 + "', '"
        + profile_complete.city + "', '" + profile_complete.state + "', "
        + profile_complete.zipcode + ', NULL);';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
    });
    console.log(profile_complete);
});

app.post('/fuel_quote', (req, res) =>
{
    const fuel_quote = {
        galRequest: req.body.galRequest.toString(),
        delvAddr: req.body.delvAddr.toString(),
        delvDate: req.body.delvDate.toString(),
        price: req.body.price.toString(),
    };
    let sql = "INSERT INTO FuelQuote VALUES (" + fuel_quote.galRequest + ", '"
        + fuel_quote.delvAddr + "', '" + fuel_quote.delvDate + "', "
        + 1.8 + ", " + fuel_quote.price + ", NULL);";
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
    });
    console.log(fuel_quote);
});

app.post('/menu_page', (req, res) =>
{
});

// setting up our server to listen on port 5000 for requests
app.listen(5000, () => 
{
    console.log('Listening on http://localhost:5000');
});
