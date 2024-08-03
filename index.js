const express = require('express');
const session = require('express-session');
const path = require('path');
const bcrypt = require('bcrypt');
const fs = require('fs');
const app = express();
const port = 5000;

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/map')
.then(()=>console.log('connected to db💕'))

const TravelData = require('./db/traveldata')

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: false }));
app.set('view engine', 'ejs');

// Define routes
app.get('/', (req, res) => {
    if (req.session.username) {
        res.render("Home.ejs", { username: req.session.username });
    } else {
        res.redirect('/login');
    }
});

app.get('/login', (req, res) => {
    res.render("login.ejs");
});

app.get('/signup', (req, res) => {
    res.render("signup.ejs");
});

app.get('/about', (req, res) => {
    if (req.session.username) {
        res.render("about.ejs", { username: req.session.username });
    } else {
        res.redirect('/login');
    }
});

app.get('/contact', (req, res) => {
    res.send("hey from contact..........");
});

// Read users data from JSON file
const getUsers = () => {
    try {
        const usersData = fs.readFileSync('users.json');
        return JSON.parse(usersData);
    } catch (error) {
        console.error('Error reading users data:', error);
        return [];
    }
};

// Write users data to JSON file
const saveUsers = (users) => {
    try {
        fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    } catch (error) {
        console.error('Error saving users data:', error);
    }
};

// Signup endpoint
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the username already exists
        const users = getUsers();
        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            return res.send('User already exists. Please choose a different username.');
        }

        // Hash the password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Save the new user
        users.push({ username, password: hashedPassword });
        saveUsers(users);

        res.status(201).send('User created successfully');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Retrieve user from JSON file
        const users = getUsers();
        const user = users.find(user => user.username === username);
        if (!user) {
            return res.send("User not found");
        }

        // Compare the hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.send("Wrong password");
        }

        // Set session for authentication
        req.session.username = username;
        res.redirect('/');
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Logout endpoint
app.get('/logout', (req, res) => {
    req.session.destroy(); // Clear session
    res.redirect('/login'); // Redirect to login
});
app.get('/travelform',async(req,res)=>{
    // TravelData.create(req.body);
     res.render('Form/travel')
})
app.post('/travelform',async(req,res)=>{
   
    await TravelData.create(req.body);
    res.redirect('/')
})

app.post('/destination',async(req,res)=>{
    const data = await TravelData.find({city:req.body.city})
     res.render('destination.ejs',{data})
})
app.get('/showcard/:id',async(req,res)=>{
    try {
        const data = await TravelData.findById(req.params.id);
        res.render('carddata', { data });
    } catch (error) {
        console.error('Error fetching card data:', error);
        res.status(500).send('Internal Server Error');
    }

})

app.get('/destination', async(req, res) => {
    if (req.session.username) {
        const data = await TravelData.find({});
        res.render("destination.ejs",{data});
    } else {
        res.redirect('/login');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
