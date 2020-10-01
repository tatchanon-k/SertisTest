const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://Test12345:Test12345@testcluster.nojjd.mongodb.net/<dbname>?retryWrites=true&w=majority";

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

app.listen(3000, function() {
    console.log('listening on 3000')
})

//Connect MongoDB via Free MongoDB Atlas
MongoClient.connect(uri, {useUnifiedTopology: true}, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
    const db = client.db('sertis-test')
    const cardCollection = db.collection('cards')

    //Create Card
    app.post('/createCards', (req, res) => {
        cardCollection.insertOne(req.body)
            .then(result => {
                res.redirect('/')
                console.log("Sent Data")
            })
            .catch(error => console.error(error))
    })

    //Query Card Data
    app.get('/', (req, res) => {
        db.collection('cards').find().toArray()
            .then(results => {
            res.render('index.ejs', { cards: results })
        })
        .catch(error => console.error(error))
    })

    //Edit Card
    app.put('/editCards', (req, res) => {
        cardCollection.findOneAndUpdate(
            { author: req.body.author },
            {
                $set: {
                    name: req.body.name,
                    status: req.body.status,
                    content: req.body.content,
                    category: req.body.category,
                }
            }
        )
        .then(editedCard => {
            if(editedCard){
                res.json("Edited Card")
            }
            else{
                res.json("No Card to Edit")
            }

        })
        .catch(error => console.error(error))
    })

    //Delete Card
    app.delete('/deleteCards', (req, res) => {
        cardCollection.deleteOne(
          { author: req.body.author,
            name: req.body.name,
            status: req.body.status,
            content: req.body.content,
            category: req.body.category
            }
        )
        .then(result => {
            if (result.deletedCount === 0) {
                return res.json('No Card to Delete')
            }
            res.json('Deleted Card')
        })
        .catch(error => console.error(error))
    })
})

