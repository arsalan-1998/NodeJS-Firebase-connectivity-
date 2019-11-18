var firebase = require("firebase-admin");

var serviceAccount = require("./node-ui-project-firebase-adminsdk-7zwkw-d5866e52e8.json");

const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended:true }));

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://node-ui-project.firebaseio.com/"
});

var db = firebase.database();
var ref = db.ref("users");

app.get('/api/add', (req,res) => {
  res.render('home');
});

app.post('/api/add', (req,res) => {
  const data = req.body.dat
  var usersRef = ref.child("user");
  usersRef.push({
    person: {
      name:data.user_name,
      phone:data.phone,
      birthday:data.birthday,
      recievedGreeting:data.flag
    }
  });
  res.redirect('/');
});

app.get('/', (req,res) => {
  ref.on("child_added", function(snapshot) {
    d = snapshot.val();
    console.log(d);
    res.send(d);
  });
})

const port = process.env.port || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`))