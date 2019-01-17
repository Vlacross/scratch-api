const express = require('express');
const app = express()

const mongoose = require('mongoose');
const db = mongoose.connection;

const morgan = require('morgan');

const {PORT, DATABASE_URL} = require('./config');

const {post} = require('./schema')
app.use(express.json());
app.use(express.static('view'));

app.get('/posts', (req, res) => {
    post.findOne({})
    .then(post => res.send(post))
    
    console.log('getted')
    res.status(200)
    /*code the get */
});

app.post('/posts', (req, res) => {
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

