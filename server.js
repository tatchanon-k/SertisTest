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

MongoClient.connect(uri, {useUnifiedTopology: true}, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
    const db = client.db('sertis-test')
    const cardCollection = db.collection('cards')

    app.post('/createCards', (req, res) => {
        cardCollection.insertOne(req.body)
            .then(result => {
                res.redirect('/')
                console.log("Sent Data")
            })
            .catch(error => console.error(error))
    })

    app.get('/', (req, res) => {
        db.collection('cards').find().toArray()
            .then(results => {
            // console.log(results)
            res.render('index.ejs', { cards: results })
        })
        .catch(error => console.error(error))
    })

    app.post('/editCards', (req, res) => {
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
            // { upsert: true }
        )
        .then(result => {
            // console.log(result)
            res.json('Success')
        })
        .catch(error => console.error(error))
    })

    // app.put('/quotes', (req, res) => {
    //     cardCollection.findOneAndUpdate(
    //         { name: 'Yoda' },
    //         {
    //             $set: {
    //                 name: req.body.name,
    //                 quote: req.body.quote
    //             }
    //         },
    //         { upsert: true }
    //     )
    //     .then(result => {
    //         // console.log(result)
    //         // res.json('Success')
    //         res.json('Success')
    //     })
    //     .catch(error => console.error(error))
    // })

    app.delete('/deleteCards', (req, res) => {

        cardCollection.deleteOne(
          { author: req.body.author,
            name: req.body.name,
            status: req.body.status,
            content: req.body.content,
            category: req.body.category, 
            }
        )
        .then(result => {
            // console.log(result)
            if (result.deletedCount === 0) {
              return res.json('No Card to Delete')
            }
            res.json(`Delete Card`)
        })
        .catch(error => console.error(error))
    })

})

