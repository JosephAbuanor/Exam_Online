const url = require('url');
const express = require('express');
const bodyParser = require('body-parser');
var session = require('express-session');
var mysql = require('mysql');
var app = express();
var path = require('path');
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('./')) 


 conn = mysql.createConnection({
  host: 'localhost', // Replace with your host name
  user: 'root',      // Replace with your database username
  password: 'myrfidpass',      // Replace with your database password
  database: 'exam_base' // // Replace with your database Name
}); 


conn.connect(function(err) {
  if (err) throw err;
  console.log('Db is connected successfully !');
});


app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.post('/user_create', function(req, res){

   firstname = req.body.firstname;
   lastname = req.body.lastname;
   email = req.body.email;
   password = req.body.password;
  

   var sql= "INSERT INTO student(first_name,last_name, email, password) VALUES ('"+firstname+"', '"+lastname+"', '"+email+"', '"+password+"');"
    conn.query(sql, function(err ,result){
    if (err) throw err;
    console.log('Reg Inserted');
    })
    res.redirect('back');
  
})


app.post('/user_login', function(req, res){
  var login_email = req.body.login_email;
  login_password = req.body.login_password;

  

  var logsql = "INSERT INTO studentlog (email,state,time) VALUES ('"+login_email+"','login',now() );";
  conn.query(logsql, function(err, result){ if (err) throw err;
    console.log('Log Inserted'); });

  var sql= "SELECT * FROM student WHERE email ='"+login_email+"' AND password = '"+login_password+" ';"
  conn.query(sql, function(err ,result){
    if (err) throw err;



    	if (result.length > 0) {
				req.session.loggedin = true;
				req.session.username = login_email;
        res.sendFile(path.join(__dirname + '/dashboard.html'));
        console.log(login_email + " " + login_password);
			} else {
				res.send('Incorrect Username and/or Password!');
			}			

    })

})


app.post('/history', function(req, res){
  res.sendFile(path.join(__dirname + '/QuizApp/index.html'));
})

app.post('/geography', function(req, res){
  res.sendFile(path.join(__dirname + '/QuizApp/index.html'));
})

app.post('/techscience', function(req, res){
  res.sendFile(path.join(__dirname + '/QuizApp/index.html'));
})
app.post('/genknow', function(req, res){
  res.sendFile(path.join(__dirname + '/QuizApp/index.html'));
})

app.get('/startexam', function(req, res){
  res.sendFile(path.join(__dirname + '/QuizApp/game.html'));
})

app.get('/gohome', function(req, res){
var fullurl =  req.originalUrl;
var url = fullurl.split('=');
var scoreval = url[url.length - 1];

//res.send (scoreval + login_email);



 res.sendFile(path.join(__dirname + '/dashboard.html'));
})







app.listen(3000);


