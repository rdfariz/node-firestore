var express = require('express')
var bodyParser = require('body-parser')
var store = require('store')
var app = express()

var fire = require('./firebase')
var db = fire.firestore()
var auth = fire.auth()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', (req, res)=>{
    var listUser = []
    auth.onAuthStateChanged((user)=>{
        if (user) {
            db.collection('users').get()
            .then(result=>{
                result.forEach(doc=>{
                    listUser.push(doc.data())
                })

                res.render('dashboard', {
                    data: JSON.stringify(user.email),
                    listUser: JSON.stringify(listUser)
                })
            })           
        }else {
            res.redirect('signin')
        }
    })
})
app.get('/signin', (req, res)=>{
    res.render('signin')
})
app.get('/signup', (req, res)=>{
    res.render('signup')
})
app.post('/signup', (req, res)=>{
    const email = req.body.email
    const password = req.body.password

    auth.createUserWithEmailAndPassword(email, password)
    .then((result)=>{
        db.collection('users').add({
            email: result.user.email
        }).then(ref=>{
            res.redirect('/signin')
        })
    })
})
app.post('/signin', (req, res)=>{
    const email = req.body.email
    const password = req.body.password

    auth.signInWithEmailAndPassword(email, password)
    .then((result)=>{
        store.set('user', result.user.uid)
        res.redirect('/')
    }).catch((err)=>{
        res.redirect('/signin')
    })
})
app.get('/logout', (req, res)=>{
    auth.signOut().then((result)=>{
        res.redirect('/')
    })
})

app.listen(3000)
console.log('listening on 3000')