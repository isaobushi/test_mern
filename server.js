const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const questions = require('./routes/api/questions');
const courses = require('./routes/api/courses');
const cors = require('cors');

const app = express();

// body-parser middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//DB config

const db = require('./config/key').mongoURI;

//connect to mongoDB

mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log('MongoDB connected'))
	.catch(err => console.log(err));

// Passport middleeare
app.use(passport.initialize());

// Passport Config

require('./config/passport')(passport);
// use routes

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/questions', questions);
app.use('/api/courses', courses);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
