const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const campGround = require('./models/campground')
// Connect mongoose 
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp',{
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', ()=>{
    console.log("Database connected");
})

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) =>{
    res.render('home')
});

app.get('/makecampground', async (req, res) =>{
    const camp = new campGround ({
        title: 'My Backyard',
        description: "Cheap campimg"
    });
    await camp.save();
    res.send(camp)
})




app.listen(3000, ()=>{
    console.log('Serving on port 3000')
})