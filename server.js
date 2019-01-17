const express = require('express');
const app = express()
const router = express.Router()

const mongoose = require('mongoose');

const morgan = require('morgan');

const {PORT, DATABASE} = require('/config.js')

app.use('/', app.static('/views'));

router.get('/posts', (req, res) {
    /*code the get */
})

router.post('/posts', (req, res) {
    /*code the Post */
})

router.put('/posts/:id', (req,res) {
    /*code some updater */
})

router.delete('/posts/:id', (req, res) {
    /*make a post remover here */
})

let server;

function runServer() {

}

function closeServer() {

}