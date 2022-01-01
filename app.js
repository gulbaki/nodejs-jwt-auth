const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');

const uri = "mongodb+srv://root:root@cluster0.so5im.mongodb.net/node-auth";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then((res) => app.listen(3000))
.catch((err) => console.log(err));

app.get('/', (req, res) => res.render('home'));
app.use(authRoutes);

