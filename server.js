const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const mongoose = require('mongoose');

const { PORT, DATABASE_URL } = require('./config');
const { Author, Post } = require('./models')
const { extract } = require('./toolCode')

app.use(express.json());
app.use(express.static('view'));


app.get('/authors', (req, res) => {
    Author.find()
        .then(function (authors) {
            authors.forEach(author => {
                console.log(author.fullName)
            })
            res.send(authors)

        })
})

app.get('/authors/:id', (req, res) => {
    Author.findOne({ _id: req.params.id })
        .then(author => {
            console.log('Just passing through thanks...')
            res.json(author)
        })
})

app.get('/posts', (req, res) => {
    Post.find()
        .select('-comments')
        .then(function (posts) {
            let newPosts = [];
            posts.forEach(post => {
                console.log(post.serialize())
                newPosts.push(post.serialize())
            })
            res.json(newPosts)
        })

    res.status(200)

    /*code the get */
});

app.get('/posts/:id', (req, res) => {
    Post.findOne({ _id: req.params.id })
        // .populate('author')
        .then(post => {
            console.log(post.serialize())
            res.json(post.serialize())
        });
    res.status(200);
})

app.post('/posts', jsonParser, (req, res) => {
    const requiredFields = ["author_id", "title", "content"];
    requiredFields.forEach(field => {
        if (!(req.body[field])) {
            console.error('air ores');
            return res.send(`Missing ${field} in data`).status(400)
        };
    })
    /*Validate author exists */
    const { author_id } = req.body
    let newId = extract(author_id)
    const valid = Author.checkExist(newId, '_id')



    // console.log(!valid === newId)
    Post.findByIdAndUpdate({ _id: mongoose.Types.ObjectId() }, {
        title: req.body.title,
        author: newId,
        content: req.body.content,
        created: new Date
    }, {
            upsert: true,
            setDefaultsOnInsert: true,
            new: true,
            populate: 'author'
        })

        .then(function (newPost) {

            console.log(newPost.serialize(), 'after-then')
            res.json(newPost.serialize())
            res.status(202)
        })
        .catch(err => console.log(err))


    /*code the Post */
});

app.put('/posts/:id', (req, res) => {
    if (!req.params.id) {
        console.error('Missing \'id\'!!')
        return res.status(400)
    };

    const { title, author, content, created } = req.body;
    const updatedData = {
        title,
        author,
        content,
        created
    }
    // Signature of .findByIdAndUpdate():
    // id to find, new data to update with, options
    // in options, we set new:true so that we get the newly updated data
    Post.findByIdAndUpdate(req.params.id, updatedData, { new: true })
        .then(post => {
            console.log(post.id)
            res.sendStatus(200)
        })
});

app.delete('/posts/:id', (req, res) => {
    if (!req.params.id) {
        console.error('missing \'id\'!!')
        return res.status(400)
    };
    Post.findByIdAndDelete({ _id: req.params.id })
        .then(res.end().status(204))
    /*make a post remover here */
});

app.post('/authors', (req, res) => {
    const expectedFields = ['firstName', 'lastName', 'userName'];
    expectedFields.forEach(field => {
        if (!req.body[field]) {
            let msg = `Insufficiient Data! Missing ${field} in request body!`
            console.error(msg);
            return res.status(400)
        }
    })

    const { firstName, lastName, userName } = req.body
    const newAuthor = {
        firstName,
        lastName,
        userName
    };
    
    console.log(newAuthor.userName)
    let val = Author.checkExist(newAuthor.userName, 'userName')

    console.log()
})









let server;

function runServer(PORT, DATABASE_URL) {

    /*recommended for performance outside of dev env :  */
    mongoose.connect(DATABASE_URL, { useNewUrlParser: true }, error => {

        if (error) {
            console.log(error);
            reject(error)
        }
        server = app.listen(PORT, () => {
            console.log(`App is listening on : ${PORT}`)
        });
        if ('error', err => {
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

