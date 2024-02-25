const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB Atlas
const dbUrl = 'mongodb+srv://10829465:TcY2DKWRHdNQZYkb@cluster0.pcvt3m9.mongodb.net/gps?retryWrites=true&w=majority';
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => {
        console.error('Error connecting to MongoDB Atlas:', err);
        process.exit(1); //exit if connection fails
    });
// Use the cors middleware to allow requests from all origins
app.use(cors());

// Define a user schema and model
const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    password: String
}));

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

// Endpoint to handle sign-in form submission
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if user with the same username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Username already exists' });
        }

        // Create a new user
        const newUser = new User({ username, password });
        await newUser.save();
        res.json({ success: true, message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ success: false, message: 'Error creating user' });
    }
});

app.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if the provided password matches the stored password
        if (user.password !== password) {
            return res.status(401).json({ success: false, message: 'Incorrect password' });
        }

        // Authentication successful
        res.json({ success: true, message: 'Authentication successful' });
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).json({ success: false, message: 'Error authenticating user' });
    }
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

