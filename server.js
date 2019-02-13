const express = require('express');
const mongoose = require('mongoose');

const users = require('./api/users');
const profile = require('./api/profile');
const posts = require('./api/posts');

const app = express();

//DB config

const db = require('./config/key').mongoURI;

//connect to mongoDB

mongoose
	.connect(db)
	.then(() => console.log('MongoDB connected'))
	.catch(err => console.log(err));

// use routes

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.get('/', (req, res) => res.send('Hello'));
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
