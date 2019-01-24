const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const mongoose = require('mongoose');

const { PORT, DATABASE_URL } = require('./config');
const { Post, Author } = require('./schema')

app.use(express.json());
app.use(express.static('view'));


app.get('/authors', (req, res) => {
    Author.find()
    .then(function(authors) {
        console.log(authors._id)
        res.send(authors)
        
    })           
})

app.get('/authors/:id', (req, res) => {
    Author.findOne({_id: req.params.id})
    .then(author => {
        console.log('Just passing through thanks...')
        res.json(author)
    })           
})

app.get('/posts', (req, res) => {
    Post.find()
    .populate('author')
    .select('-comments')
    .then(function(posts) {
        let newPosts =[];
        posts.forEach(post => {
            
            newPosts.push(post.serialize())
        })
        res.json(newPosts)  
    })
    
    res.status(200)
    
    /*code the get */
});

app.get('/posts/:id', (req, res) => {
    Post.findOne({ _id: req.params.id })
        .populate('author')
        .then(post => {
           
          
            res.json(post.serialize())
        });
    res.status(200);
})

app.post('/postser', (req, res) => {
    const {title, author_id} = req.body
    console.log(title)
    Author.count({"_id": "5af50c84c082f1e92f83420b"}, function(err, count) {
        if(count>0) {console.log('Yes!', count)}
        else if(err) {console.log(err)}
    })
})


app.post('/posts', jsonParser, (req, res) => {
    const requiredFields = ["author_id", "title", "content"];
    requiredFields.forEach(field => {
        if (!(req.body[field])) {
            console.error('air ores');
        return res.send(`Missing ${field} in data`).status(400)
        };
       
    })

    Author.aggregate({$count: {"_id": "ObjectId(5af50c84c082f1e92f83420b)"}}, function(err, count) {
        if(count>0) {console.log('ID EXISTS!', count)}
        else if(count=0) {console.log('Couldn\'t find Author ID')}
        else if(err) {console.log(err)}
    })
    
    Post.create({
        title: req.body.title,
        author: {type: mongoose.Types.ObjectId, ref: 'Author'},
        content: req.body.content,
        created: new Date()
    })
    .then(function(newPost){
        console.log(newPost)
        res.json(newPost)
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
    Post.findByIdAndUpdate(req.params.id, updatedData, {new: true})
    .then(post => {
        console.log(post.id)
        res.sendStatus(200)
    })

    // const newData = Object.keys(req.body)
    // console.log(newData)
    // const possibleUpdates = ["title", "author", "content"]
    // newData.forEach(key => {
    //     if (!possibleUpdates.includes(key)) {
    //         console.error('db Schema doesn\'t support proposed data')
    //     }
    // })
    // Post.update({_id: "id"}, {$set: newData })
    // /*code some updater */
});

app.delete('/posts/:id', (req, res) => {
    if(!req.params.id) {
        console.error('missing \'id\'!!')
        return res.status(400)
    };
    Post.findByIdAndDelete({_id: req.params.id})
    .then( res.end().status(204))
    /*make a post remover here */
});

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

