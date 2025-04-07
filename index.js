//************** Part 1: Routes, Templates, and Views **************//
//1- Set up your express 
const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

//2- Set up the View Engine
app.set('view engine', 'ejs');

//3- Set Up Routes for both pages index.js and about.js
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

//4- Create a POST Request
//Create a POST route
app.post('/submit', (req, res) => {
    console.log(req.body); 
    res.send('Success');
});

//Add middleware to parse incoming request data
app.use(express.urlencoded({ extended: true }));

//5- Route Parameters
app.get('/user/:username', (req, res) => {
    const { username } = req.params;
    res.render('profile', { username });
});



//************** Part 2: Middleware **************//
//1- Middleware to log request information
app.use((req, res, next) => {
    console.log(`Request method: ${req.method} | Request URL: ${req.url}`);
    next(); // Pass control to the next middleware
});

//2- Third-Party Middleware
//use Morgan as a third-party middleware in Express to log HTTP requests because its the commonly used 
const morgan = require('morgan');
app.use(morgan('dev')); // This will log the requests in the console


//************** Part 3: Exploring Response Options **************//
//1- use a static file 
app.use(express.static('public'));

//2- Create a route to download the image
app.get('/download', (req, res) => {
    const file = `${__dirname}/public/images/th.jpg`;
    res.download(file); 
});

