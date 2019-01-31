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
    Post.create({
        title: req.body.title,
        author: newId,
        content: req.body.content,
        created: new Date
    })
        .then(newPost => {
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

    const { title, content, _id } = req.body;
    const updatedData = {
        title,
        content
    }
    console.log(updatedData)
    // Signature of .findByIdAndUpdate():
    // id to find, new data to update with, options
    // in options, we set new:true so that we get the newly updated data
    Post.findByIdAndUpdate(_id, {$set: updatedData}, { new: true })
        .then(post => {
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
/* */


/*Authors */
app.get('/authors', (req, res) => {
    Author.find()
        .then(function (authors) {
            let authorList = [];
            authors.forEach(author => {
                console.log(author.fullName)
                authorList.push(author.serialize())
            })
            res.send(authors)

        })
})

app.get('/authors/:id', (req, res) => {
    Author.findOne({ _id: req.params.id })
        .then(author => {
            console.log('Just passing through thanks...')
            res.json(author.serialize())
        })
})

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

    Author.create(newAuthor)
    .then(author => {
        console.log(author)
        res.json(author.serialize()).status(200).end()
    })
})

app.put('/authors/:id', (req, res) => {
    if(!req.params.id) {
        console.error('missing \'id\'!!');
        return res.status(400).end()
    };
    
    const {firstName, lastName, userName, _id} = req.body
    const authorData = {
        firstName,
        lastName,
        userName
    }

    Author.findByIdAndUpdate(_id, {$set: authorData}, {new: true})
    .then(author => {
        console.log(author)
        res.json(author.serialize()).status(200)
    })
})

app.delete('/authors/:id', (req, res) => {
    if(!req.params.id) {
        console.error('missing \'id\'!!');
        return res.status(400).end()
    };
    const authorId = req.params.id;
    console.log(authorId)
    
   
    // Post.find({author: authorId})
    //     .then(posts => {
    //         console.log(posts[0].author.id)
    //         posts.forEach(post => {
    //             post.remove()
    //         })
    //         return ;
    //     })
    //  Author.findOne({ _id: req.params.id })
    //     .remove()


    Post.find({author: authorId}, function(err, doc) {
        // console.log(doc.exec())
    })
    Author.find({_id: authorId}).remove()

    
    .then(res.status(204).end())
    console.log('ends')
    
})
/*
app.delete('/posts/:id', (req, res) => {
    if (!req.params.id) {
        console.error('missing \'id\'!!')
        return res.status(400)
    };
    Post.findByIdAndDelete({ _id: req.params.id })
        .then(res.end().status(204))
    /*make a post remover here 
});
*/







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
    mongoose.connection.close();

};

(require.main === module) ? runServer(PORT, DATABASE_URL) : console.log('started outside of terminal');

