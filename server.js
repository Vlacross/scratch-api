const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const mongoose = require('mongoose');
const db = mongoose.connection;

const {PORT, DATABASE_URL} = require('./config');
const {post} = require('./schema')

app.use(express.json());
app.use(express.static('view'));



app.get('/posts', (req, res) => {
    post.find({})
    .then(function(post) {
        res.send(post)})
    res.status(200)
    /*code the get */
});

app.get('/posts/:id', (req, res) => {
    console.log(req.params.id)
    post.findOne({_id: req.params.id})
    .then(post => res.send(post));
    res.status(200);
})

app.post('/posts', jsonParser, (req, res) => {
    const requiredFields = ["author", "title", "content"];
    requiredFields.forEach(field => {
        console.log(field)
        if(!(req.body[field]))
        console.log('air ores');
        return res.status(504)
    })

    post.create({
                title: req.body.title,
                 author: {
                        firstName: req.body.author.firstName,
                        lastName: req.body.author.lastName
                        },
                content: req.body.content,
                created: new Date()
                })
    .then(post.find()
        .then(post => res.send(post)))
    res.status(202)
    
    /*code the Post */
});

app.put('/posts/:id', (req,res) => {
    /*code some updater */
});

app.delete('/posts/:id', (req, res) => {
    /*make a post remover here */
});

let server;

function runServer(PORT, DATABASE_URL) {

   
    mongoose.connect(DATABASE_URL, {useNewUrlParser: true }, error => {

        if(error){
            console.log(error);
            reject(error)
        }
        server = app.listen(PORT, () => {
            console.log(`App is listening on : ${PORT}`)
            
        });
        if('error', err => {
            console.log(err, 'error - disconnecting mongoose')
            mongoose.disconnect();
            reject(err)
        });
        
        // const message = 'Could not connect to db. Make sure server is running.';
        // console.error(message)
    })
    
   
};

function closeServer() {
    mongoose.disconnect();

};

(require.main === module) ? runServer(PORT, DATABASE_URL) : console.log('started outside of terminal');

