const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cors = require('cors');

const mongoose = require('mongoose');

const { PORT, DATABASE_URL } = require('./config');
const { Author, Post } = require('./models')
const { extract } = require('./toolCode')


app.use(cors())
app.use(express.json());
app.use(express.static('view'));




// /*Get all Posts */
// app.get('/posts', (req, res) => {
//     Post.find()
//         .select('-comments')
//         .then(function (posts) {
//             let newPosts = [];
//             posts.forEach(post => {
//                 newPosts.push(post.serialize())
//             })
//             res.json(newPosts)
//         })
//     res.status(200);
// });

// /*Get Post by Id(includes comments) */
// app.get('/posts/:id', (req, res) => {
//     Post.findOne({ _id: req.params.id })
//         .then(post => {
//             console.log(post.serialize())
//             res.json(post.serialize())
//         });
//     res.status(200);
// })


/******************************************************************************************************/

app.post('/merch-side-product', jsonParser, (req, res) => {
    let missingFields
    const requiredFields = ['uuid', 'subscription', 'custName', 'fiscalToken'];
    missingFields = requiredFields.find(field => !req.body[field])
    if(missingFields.length !== 0) {
        return res.json({
            type: 'error',
            code: 451,
            message: `Missing ${missingFields} in request headers, cannot process`
        })
    }
    return res.json({success: true, message: 'merchant product transaction completed successfully'})
})





/*
 uuid: 000000000000000000000000,
  prodName: "Chapstick BackPack",
  subscription: false,
  custName: "Ralphy Jones",
  fiscalToken: "$PL0I!G111eLvEnZkQq"

*/







// /******************************************************************************************************/

// /*make and add a Post */
// app.post('/posts', jsonParser, (req, res) => {
//     /*check required fields exist in header*/
//     const requiredFields = ["author_id", "title", "content"];
//     requiredFields.forEach(field => {
//         if (!(req.body[field])) {
//             console.error('air ores');
//             return res.send(`Missing ${field} in data`).status(400)
//         };
//     })
//     /*Validate author exists */
//     const { author_id } = req.body
//     let newId = extract(author_id)
//     Author.checkExist(newId, '_id').exec()
//     .then(function(val) {
//         if(!(val === 1)) {
//             console.log(val)
//             return res.status(400).end()
//         }
//         return val
//     })
//     Post.create({
//         title: req.body.title,
//         author: newId,
//         content: req.body.content,
//         created: new Date
//     })
//     .then(newPost => {
//         res.json(newPost.serialize())
//         res.status(202)
//     })
//     .catch(err => console.log(err))
// });

// /*Update post(title and content only) */
// app.put('/posts/:id', (req, res) => {
//     if (!req.params.id) {
//         console.error('Missing \'id\'!!')
//         return res.status(400)
//     };

//     const { title, content, _id } = req.body;
//     const updatedData = {
//         title,
//         content
//     }
//     // Signature of .findByIdAndUpdate():
//     // id to find, new data to update with, options
//     // in options, we set new:true so that we get the newly updated data
//     Post.findByIdAndUpdate(_id, {$set: updatedData}, { new: true })
//         .select('-comments')
//         .then(post => {
//             res.json(post.serialize()).status(200).end()
//         })
// });

// /*delete author by id along with all referenced posts */
// app.delete('/posts/:id', (req, res) => {
//     if (!req.params.id) {
//         console.error('missing \'id\'!!')
//         return res.status(400)
//     };
//     Post.findByIdAndDelete({ _id: req.params.id })
//         .then(res.status(204).end()
//         )
// });

// /*Authors */

// /*Get all authors */
// app.get('/authors', (req, res) => {
//     Author.find()
//         .then(function (authors) {
//             let authorList = [];
//             authors.forEach(author => {
//                 authorList.push(author.serialize())
//             })
//             res.send(authorList)

//         })
// })

// /*Get author by id */
// app.get('/authors/:id', (req, res) => {
//     Author.findOne({ _id: req.params.id })
//         .then(author => {
//             console.log('Just passing through thanks...')
//             res.json(author.serialize())
//         })
// })

// /*Add an author with POST */
// app.post('/authors', (req, res) => {
//     const expectedFields = ['firstName', 'lastName', 'userName'];
//     expectedFields.forEach(field => {
//         if (!req.body[field]) {
//             let msg = `Insufficiient Data! Missing ${field} in request body!`
//             console.error(msg);
//             return res.status(400)
//         }
//     })

//     const { firstName, lastName, userName } = req.body
//     const newAuthor = {
//         firstName,
//         lastName,
//         userName
//     };

//     Author.create(newAuthor)
//     .then(author => {
//         res.json(author.serialize()).status(200).end()
//     })
// })

// app.put('/authors/:id', (req, res) => {
//     if(!req.params.id) {
//         console.error('missing \'id\'!!');
//         return res.status(400).end()
//     };
    
//     const id = req.params.id
//     const {firstName, lastName, userName} = req.body
//     const authorData = {
//         firstName,
//         lastName,
//         userName
//     }

//     Author.findByIdAndUpdate(id, {$set: authorData}, {new: true})
//     .then(author => {
//         console.log(author)
//         res.json(author.serialize()).status(200)
//     })
// });

// /*Delete author and all reference docs */
// app.delete('/authors/:id', (req, res) => {
//     if(!req.params.id) {
//         console.error('missing \'id\'!!');
//         return res.status(400).end()
//     };
//     const authorId = req.params.id;
//     console.log(authorId)
    
   
//     Post.find({author: authorId})
//         .then(posts => {
//             posts.forEach(post => {
//                 post.remove()
//             });  
//         });
//      Author.findOne({ _id: authorId }).remove()
//     .then(res.status(204).end())   
// });

/*Handle server Status */
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
    })
};

function closeServer() {
    mongoose.connection.close();

};

(require.main === module) ? runServer(PORT, DATABASE_URL) : console.log('started outside of terminal');

