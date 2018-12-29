var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'eu-cdbr-west-02.cleardb.net',
  user: 'bd852863550383',
  password: '9518ea41',
  database: 'heroku_59480847dafd271'
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/create', function (req, res) {
  connection.query('DROP TABLE courses');
  connection.query('DROP TABLE usercourses');
  connection.query('CREATE TABLE usercourses(id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, course_id INT)', function (err, results) {
    if(err){
      return res.json({
        message: err.message
      })
    }
    else{
      connection.query("INSERT INTO usercourses VALUES(1, 1, 1)");
    }
  })
  connection.query('CREATE TABLE courses(id INT, main_course VARCHAR(255), course_name VARCHAR(255), link VARCHAR(255), description VARCHAR(255))', function(err, results){
    if(err){
      return res.json({
        message: err.message
      })
    }
    else{
      connection.query("INSERT INTO courses VALUES(1, 'Algorithm and Programming', '[Algorithm Session 01] - IDE and I/O', 'https://www.youtube.com/embed/YvjMya_9RcA', 'Topics: - Typing code with syntax error - Compile, run, and debug program - Knowing data type and variable assignment - Creating a program using I/O syntax')");
      connection.query("INSERT INTO courses VALUES(2, 'Algorithm and Programming', '[Algorithm Session 02] - Arithmatic Operation', 'https://www.youtube.com/embed/O_E_Jzje6IM', 'Topic - Creating a program using arithmatic operation')");
      connection.query("INSERT INTO courses VALUES(3, 'Algorithm and Programming', '[Algorithm Session 03] - Repetition', 'https://www.youtube.com/embed/GJ9vQ-CMb9M', 'Topic: - Create a program using repetition structure control')");
      connection.query("INSERT INTO courses VALUES(4, 'Algorithm and Programming', '[Algorithm Session 04] - Selection', 'https://www.youtube.com/embed/ETPxMBZCmng', 'Topic - Create a program using selection control')");
      connection.query("INSERT INTO courses VALUES(5, 'Algorithm and Programming', '[Algorithm Session 05] - Array', 'https://www.youtube.com/embed/RJkY-5hJq3k', 'Topics: - Creating a modular program using array 1D - Creating a modular program using array 2D')");
      return res.json({
        message: 'success'
      })
    }
  })
})

router.get('/courses', function (req, res) {
  connection.query("SELECT id, main_course, course_name, description FROM courses", function (err, results) {
    if(err){
      return res.json({
        message: err.message
      })
    }
    else{
      return res.json({results});
    }
  })
})

router.post('/user_courses', function (req,res) {
  var userid = req.body.userid
  connection.query('SELECT c.id, main_course, course_name, description FROM usercourses uc JOIN courses c ON uc.course_id = c.id WHERE user_id=?', [userid], function(err, results){
    if(err){
      return res.json({
        message: err.message
      })
    }
    else{
      return res.json({
        user_id : userid,
        courses: results
      })
    }
  })  
})

router.post('/detail_courses', function (req, res){
  var courseid = req.body.courseid;
  connection.query('SELECT * FROM courses WHERE id=?', [courseid], function(err, result){
    if(err){
      return res.json({
        message: err.message
      })
    }
    else{
      return res.json(result[0])
    }
  })

})

router.post('/assign_courses', function (req, res){
  var courseid = req.body.courseid;
  var userid = req.body.userid;
  connection.query('INSERT INTO usercourses(user_id, course_id) VALUES (?, ?)', [userid, courseid], function(err, result){
    if(err){
      return res.json({
        message: err.message
      })
    }else{
      return res.json({
        user_id:userid,
        course_id: courseid,
        status: 'success'
      })
    }
  })
})

module.exports = router;
