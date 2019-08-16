const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
//app.use(express.static('views'));
app.set('views', [path.join(__dirname, 'views'),path.join(__dirname, 'views/Xendit'),path.join(__dirname, 'views/Xendit/comment')]);
//app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo-comment:27017/Xendit',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  const Item = require('./models/comments');

// Connect to MongoDB
/*mongoose
  .connect(
    'mongodb://mongo:27019/orgs',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));*/

const members = require('./models/members');

const newmembers = new members([

  {emailid : 'abishms@xendit.com',
org      : 'Xendit',  
avatarurl: 'https://api.adorable.io/avatars/285/abishms@xendit.com.png',
followers: 4,
following: 8},

{emailid : 'arunms@xendit.com',
org      : 'Xendit',
avatarurl: 'https://api.adorable.io/avatars/285/arunms@xendit.com.png',
followers: 5,
following: 9},

{emailid :'durkams@xendit.com',
org      : 'Xendit',
avatarurl:'https://api.adorable.io/avatars/285/durkams@xendit.com.png',
followers:6,
following:10},

{emailid :'abishms@paypal.com',
org      : 'Paypal',
avatarurl:'https://api.adorable.io/avatars/285/abishms@paypal.com.png',
followers:5,
following:7},

{emailid :'arunms@paypal.com',
org      : 'Paypal',
avatarurl:'https://api.adorable.io/avatars/285/arunms@paypal.com.png',
followers:6,
following:9},

{emailid: 'durkams@paypal.com',
org      : 'Paypal',
avatarurl:'https://api.adorable.io/avatars/285/durkams@paypal.com.png',
followers:8,
following:8},

{emailid:'abishms@mastercard.com',
org      : 'MasterCard',
avatarurl:'https://api.adorable.io/avatars/285/abishms@mastercard.com.png',
followers:9,
following:6},

{emailid:'arunms@mastercard.com',
org      : 'MasterCard',
avatarurl:'https://api.adorable.io/avatars/285/arunms@mastercard.com.png',
followers:7,
following:6},

{emailid:'durkams@mastercard.com',
org      : 'MasterCard',
avatarurl:'https://api.adorable.io/avatars/285/durkams@mastercard.com.png',
followers:10,
following:14}
]);


app.get('/', (req, res) => {
  Item.find()
    .then(items => res.render('index'))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
});

app.get('/Xendit/Menu', (req, res) => {
    Item.find()
      .then(items => res.render('../Xendit/Menu'))
      .catch(err => res.status(404).json({ msg: 'No items found' }));
  });
  
  app.get('/Xendit/comment/comments', (req, res) => {
    Item.find()
      .then(items => res.render('../Xendit/comment/comments'))
      .catch(err => res.status(404).json({ msg: 'No items found' }));

      
  });

  app.post('/item/add', (req, res) => {
    
      const newItem = new Item({
        comment: req.body.Comment,
        org: req.body.org,
        isDeleted: false
      });

        
      newItem.save().then(items => res.send('Comment Added Successfully'));
      
  });

  app.post('/item/delete', (req, res) => {
    
    var query = { org: req.body.org}
    Item.update(query,{ $set : {  isDeleted: true}},{multi: true})
      .then(items => res.send('All the comments are Deleted'))
      .catch(err => res.send('All the comments are Deleted'));
    
   
});


  app.get('/Xendit/comment/getcomment', (req, res) => {
    var query = { org: 'Xendit',
                  isDeleted: false}
    Item.find(query)
      .then(items => res.render('../Xendit/comment/getcomment',{ items }))
      .catch(err => res.status(404).json({ msg: 'No items found' }));

  });

  app.get('/Xendit/members', (req, res) => {
    const newmembers = new members([

      {emailid : 'abishms@xendit.com',
    org      : 'Xendit',  
    avatarurl: 'https://api.adorable.io/avatars/285/abishms@xendit.com.png',
    followers: 4,
    following: 8},
    
    {emailid : 'arunms@xendit.com',
    org      : 'Xendit',
    avatarurl: 'https://api.adorable.io/avatars/285/arunms@xendit.com.png',
    followers: 5,
    following: 9},
    
    {emailid :'durkams@xendit.com',
    org      : 'Xendit',
    avatarurl:'https://api.adorable.io/avatars/285/durkams@xendit.com.png',
    followers:6,
    following:10},
    
    {emailid :'abishms@paypal.com',
    org      : 'Paypal',
    avatarurl:'https://api.adorable.io/avatars/285/abishms@paypal.com.png',
    followers:5,
    following:7},
    
    {emailid :'arunms@paypal.com',
    org      : 'Paypal',
    avatarurl:'https://api.adorable.io/avatars/285/arunms@paypal.com.png',
    followers:6,
    following:9},
    
    {emailid: 'durkams@paypal.com',
    org      : 'Paypal',
    avatarurl:'https://api.adorable.io/avatars/285/durkams@paypal.com.png',
    followers:8,
    following:8},
    
    {emailid:'abishms@mastercard.com',
    org      : 'MasterCard',
    avatarurl:'https://api.adorable.io/avatars/285/abishms@mastercard.com.png',
    followers:9,
    following:6},
    
    {emailid:'arunms@mastercard.com',
    org      : 'MasterCard',
    avatarurl:'https://api.adorable.io/avatars/285/arunms@mastercard.com.png',
    followers:7,
    following:6},
    
    {emailid:'durkams@mastercard.com',
    org      : 'MasterCard',
    avatarurl:'https://api.adorable.io/avatars/285/durkams@mastercard.com.png',
    followers:10,
    following:14}
    ]);

    var query = { org: 'Xendit'}
    newmembers.save().then(members => (members.find(query)
    .then(members => res.render('../Xendit/members',{ members }))
    .catch(err => res.status(404).json({ msg: 'No items found' }))
    .catch(err => res.status(404).json({ msg: 'No items found' }))));
      
  });
  
  app.get('/Xendit/comment/item/comment', (req, res) => {
    Item.find()
      .then(items => res.render('../Xendit/comment/getcomment',{ items }))
      .catch(err => res.status(404).json({ msg: 'No items found' }));

      console.log(items.comment)

  });

  app.get('/Paypal/Menu', (req, res) => {
    Item.find()
      .then(items => res.render('../Paypal/Menu'))
      .catch(err => res.status(404).json({ msg: 'No items found' }));
  });
  
  app.get('/Paypal/comment/comments', (req, res) => {
    Item.find()
      .then(items => res.render('../Paypal/comment/comments'))
      .catch(err => res.status(404).json({ msg: 'No items found' }));

      
  });

  app.get('/Paypal/comment/getcomment', (req, res) => {
    var query = { org: 'Paypal'}
    Item.find(query)
      .then(items => res.render('../MasterCard/comment/getcomment',{ items }))
      .catch(err => res.status(404).json({ msg: 'No items found' }));

  });

  app.get('/MasterCard/Menu', (req, res) => {
    Item.find()
      .then(items => res.render('../MasterCard/Menu'))
      .catch(err => res.status(404).json({ msg: 'No items found' }));
  });
  
  app.get('/MasterCard/comment/comments', (req, res) => {
    Item.find()
      .then(items => res.render('../MasterCard/comment/comments'))
      .catch(err => res.status(404).json({ msg: 'No items found' }));

      
  });

  app.get('/MasterCard/comment/getcomment', (req, res) => {
    var query = { org: 'MasterCard'}
    Item.find(query)
      .then(items => res.render('../MasterCard/comment/getcomment',{ items }))
      .catch(err => res.status(404).json({ msg: 'No items found' }));

  });

app.post('/', (req, res) => {
  const newItem = new Item({
    comment: req.body.comment

  });

  newItem.save().then(item => res.redirect('../Paypal/comment/comments'));
});

const port = 3000;

app.listen(port, () => console.log('Server running...'));

