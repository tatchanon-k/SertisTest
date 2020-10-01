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


// app.get('/', (req, res) => {
//     res.sendFile('/Users/lunla/Documents/Github/SertisTest' + '/index.html')
//     // Note: __dirname is the current directory you're in. Try logging it and see what you get!
//     // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
// })

MongoClient.connect(uri, {useUnifiedTopology: true}, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
    const db = client.db('sertis-test')
    const cardCollection = db.collection('cards')

    app.post('/createCard', (req, res) => {
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
            console.log(results)
            res.render('index.ejs', { cards: results })
        })
        .catch(error => console.error(error))
        // res.render('index.ejs', {})
    })

    app.put('/quotes', (req, res) => {
        cardCollection.findOneAndUpdate(
            { name: 'Yoda' },
            {
                $set: {
                    name: req.body.name,
                    quote: req.body.quote
                }
            },
            { upsert: true }
        )
        .then(result => {
            // console.log(result)
            // res.json('Success')
            res.json('Success')
        })
        .catch(error => console.error(error))
    })

    app.delete('/quotes', (req, res) => {
        cardCollection.deleteOne(
          { name: req.body.name }
        )
        .then(result => {
            if (result.deletedCount === 0) {
              return res.json('No quote to delete')
            }
            res.json(`Deleted Darth Vadar's quote`)
        })
        .catch(error => console.error(error))
    })

})

