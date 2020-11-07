
  registerStudentBtn = document.getElementById('registerStudentBtn');
   

  signup =(e)=> {

    firstname = document.getElementById('firstname');
    lastname = document.getElementById('lastname');
    email = document.getElementById('email');
    password = document.getElementById('password');
    
  
    //var sql= "INSERT INTO student(first_name,last_name, email, password) VALUES ('"+firstname+"', '"+lastname+"', '"+email+"', '"+password+"');"
    var sql =  "INSERT INTO student(first_name,last_name, email, password) VALUES ('lol','lol','lol','lol');"
    conn.query(sql, function(err ,result){
  if (err) throw err;
    })
  }

