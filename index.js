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


const members = require('./models/members');

const newmembers = [

  {_id : 'abishms@xendit.com',
org      : 'Xendit',  
avatarurl: 'https://api.adorable.io/avatars/285/abishms@xendit.com.png',
followers: 4,
following: 8},

{_id : 'arunms@xendit.com',
org      : 'Xendit',
avatarurl: 'https://api.adorable.io/avatars/285/arunms@xendit.com.png',
followers: 5,
following: 9},

{_id :'durkams@xendit.com',
org      : 'Xendit',
avatarurl:'https://api.adorable.io/avatars/285/durkams@xendit.com.png',
followers:6,
following:10},

{_id :'abishms@paypal.com',
org      : 'Paypal',
avatarurl:'https://api.adorable.io/avatars/285/abishms@paypal.com.png',
followers:5,
following:7},

{_id :'arunms@paypal.com',
org      : 'Paypal',
avatarurl:'https://api.adorable.io/avatars/285/arunms@paypal.com.png',
followers:6,
following:9},

{_id: 'durkams@paypal.com',
org      : 'Paypal',
avatarurl:'https://api.adorable.io/avatars/285/durkams@paypal.com.png',
followers:8,
following:8},

{_id:'abishms@mastercard.com',
org      : 'MasterCard',
avatarurl:'https://api.adorable.io/avatars/285/abishms@mastercard.com.png',
followers:9,
following:6},

{_id:'arunms@mastercard.com',
org      : 'MasterCard',
avatarurl:'https://api.adorable.io/avatars/285/arunms@mastercard.com.png',
followers:7,
following:6},

{_id:'durkams@mastercard.com',
org      : 'MasterCard',
avatarurl:'https://api.adorable.io/avatars/285/durkams@mastercard.com.png',
followers:10,
following:14}
];


app.get('/', (req, res) => {
    Item.find()
    .then(items => res.render('index'))
    .catch(err => res.status(404).json({ msg: 'Error in loading Page' }));
});

app.get('/orgs/Xendit/Menu', (req, res) => {
    Item.find()
      .then(items => res.render('../orgs/Xendit/Menu'))
      .catch(err => res.status(404).json({ msg: 'Error in Loading Menu' }));
  });
  
  app.get('/orgs/Xendit/comments', (req, res) => {
    Item.find()
      .then(items => res.render('../orgs/Xendit/comments'))
      .catch(err => res.status(404).json({ msg: ' Error in Loading Comments ' }));

      
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
      .catch(err => res.send('All the comments are not Deleted'));
    
   
});


  app.get('/orgs/Xendit/getcomment', (req, res) => {
    var query = { org: 'Xendit',
                  isDeleted: false}
    Item.find(query)
      .then(items => res.render('../orgs/Xendit/getcomment',{ items }))
      .catch(err => res.status(404).json({ msg: 'Error in loading comments' }));

  });

   app.get('/orgs/Xendit/members', (req, res) => {
      
    var query = { org: 'Xendit'};
    members.insertMany(newmembers).then(items => (members.find(query).sort({ followers : -1}))
    .then(members => res.render('../orgs/Xendit/members',{ members }))
    .catch(err => res.status(404).json({ msg: 'Error in loading Page' })))
    .catch(err => {if (err.code == 11000){
                  members.find(query).sort({ followers : -1})
                  .then(members => res.render('../orgs/Xendit/members',{ members }))
                  .catch(err => res.status(404).json({ msg: 'Error in loading Page' }))
                  }
                  else {
                    return res.status(404).json({ msg: 'Error in Loading page' })
                  }  
                  })     
  });
  
  app.get('/orgs/Paypal/Menu', (req, res) => {
    Item.find()
      .then(items => res.render('../orgs/Paypal/Menu'))
      .catch(err => res.status(404).json({ msg: 'Error in Loading Menu' }));
  });
  
  app.get('/orgs/Paypal/comments', (req, res) => {
    Item.find()
      .then(items => res.render('../orgs/Paypal/comments'))
      .catch(err => res.status(404).json({ msg: 'Error in Loading Comments ' }));

      
  });

  app.get('/orgs/Paypal/getcomment', (req, res) => {
    var query = { org: 'Paypal',
                 isDeleted: false}
    Item.find(query)
      .then(items => res.render('../orgs/Paypal/getcomment',{ items }))
      .catch(err => res.status(404).json({ msg: 'Error in Loading Comments ' }));

  });

  app.get('/orgs/Paypal/members', (req, res) => {
      
    var query = { org: 'Paypal'};
    members.insertMany(newmembers).then(items => (members.find(query).sort({ followers : -1}))
    .then(members => res.render('../orgs/Paypal/members',{ members }))
    .catch(err => res.status(404).json({ msg: 'Error in Loading page' })))
    .catch(err => {if (err.code == 11000){
                  members.find(query).sort({ followers : -1})
                  .then(members => res.render('../orgs/Paypal/members',{ members }))
                  .catch(err => res.status(404).json({ msg: 'Error in Loading page' }))
                  }
                  else {
                    return res.status(404).json({ msg: 'Error in Loading page' })
                  }  
                  })
      
  });

  app.get('/orgs/MasterCard/Menu', (req, res) => {
    Item.find()
      .then(items => res.render('../orgs/MasterCard/Menu'))
      .catch(err => res.status(404).json({ msg: 'Error in Loading Menu' }));
  });
  
  app.get('/orgs/MasterCard/comments', (req, res) => {
    Item.find()
      .then(items => res.render('../orgs/MasterCard/comments'))
      .catch(err => res.status(404).json({ msg: 'Error in loading comments' }));

      
  });

  app.get('/orgs/MasterCard/getcomment', (req, res) => {
    var query = { org: 'MasterCard',
                  isDeleted: false}
    Item.find(query)
      .then(items => res.render('../orgs/MasterCard/getcomment',{ items }))
      .catch(err => res.status(404).json({ msg: 'Error in loading comments' }));

  });

  app.get('/orgs/MasterCard/members', (req, res) => {
      
    var query = { org: 'MasterCard'};
    members.insertMany(newmembers).then(items => (members.find(query).sort({ followers : -1}))
    .then(members => res.render('../orgs/MasterCard/members',{ members }))
    .catch(err => res.status(404).json({ msg: 'Error in Loading page' })))
    .catch(err => {if (err.code == 11000){
                  members.find(query).sort({ followers : -1})
                  .then(members => res.render('../orgs/MasterCard/members',{ members }))
                  .catch(err => res.status(404).json({ msg: 'Error in Loading page' }))
                  }
                  else {
                    return res.status(404).json({ msg: 'Error in Loading page' })
                  }  
                  })
      
  });


const port = 3000;

app.listen(port, () => console.log('Server running...'));

