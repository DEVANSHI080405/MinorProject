// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(cors({ origin: '*', credentials: true, optionSuccessStatus: 200 }));
app.use(bodyParser.json()); // Parse JSON data in POST requests

// Connect to MySQL database
const connection = mysql.createConnection({
  host: 'localhost',   // database host
  user: 'root',        // Your database username
  password: 'password', // Your database password
  database: 'minorpro'  // Your database name
});

// Connect to the database
connection.connect((err) => {
    if (err) {
      console.log('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL');
  });
  
  // GET request to provide data to the frontend
  app.get('/get-data', (req, res) => {
    connection.query('SELECT * FROM userdetails', (err, results) => {
      if (err) {
        res.status(500).send('Database error');
      } else {
        res.send(results);  // Send data to frontend
      }
    });
  });
  
// POST request to register a new user
app.post('/register', (req, res) => {
    // const { user_name , email_id , password, location , total_room ,total_lights  } = req.body;
    const user = {  user_name : req.body.newUsername , email_id : req.body.email, 
      password : req.body.password, location : req.body.location ,
       total_room : req.body.roomno, total_lights : req.body.lightno, 
       };

    // Basic validation
    if (!user.user_name || !user.password || !user.email_id || !user.location|| 
      !user.total_room|| !user.total_lights  ) {
      return res.status(400).send('All fields are required');
    }

    const rooms = [
      ['Hall', req.body.hallLights],
      ['Kitchen', req.body.roomLights],
      ['Bedroom', req.body.kitchenlights]
    ];    



    // Map rooms to include the same userid
    const values = rooms.map(([name, lights]) => [user.user_name, name, lights]);
      
    const Rooms = [
      { room_name: 'Hall', lights_count: req.body.hallLights },
      { room_name: 'Kitchen', lights_count: req.body.roomLights },
      { room_name: 'Bedroom', lights_count: req.body.kitchenlights }
    ];

    // Check if the user already exists
    connection.query('SELECT * FROM userdetails WHERE user_name = ?', [user.user_name], (err, results) => {
      if (err) {
        return res.status(500).send('Database error');
      }
  
      if (results.length > 0) {
        return res.status(400).send('Username already exists');
      }
        
      connection.query('INSERT INTO userdetails SET ?', user, (err) => {
        if (err) {
          return res.status(500).send('Error saving user');
        }
        connection.query('INSERT INTO roomdetails (user_name, room_name, num_lights) VALUES ?', [values], (err) => {
              if (err) {
                return res.status(500).send('Error saving rom details');
              }   
              
              let roomdetailsvalues = [];
              Rooms.forEach(v => {
                for (let i = 1; i <= v.lights_count; i++) {
                  const lightNo = `light${i}`;
                  const status = (v.room_name === 'Kitchen' && i === 1) || (v.room_name === 'Bedroom' && i === 2) || (v.room_name === 'Hall' && i === 3);
                  roomdetailsvalues.push([user.user_name, v.room_name, lightNo, false]);
                }
              });

              console.log(roomdetailsvalues);
              connection.query('INSERT INTO roomlightdetails (user_name, room_name, lightNo, Status) VALUES ?', [roomdetailsvalues], (err) => {
                if (err) {
                  console.log(err);
                  return res.status(500).send('Error saving rom details');
                }          
                res.send('User registered successfully');        
              });      
        });
      });
    });
  });
  
// POST request for user login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Basic validation
    if (!username || !password) {
      return res.status(400).send('Username and password are required');
    }
    console.log(username);
    // Check if the user exists and password is correct
    connection.query('SELECT * FROM userdetails WHERE user_name = ? AND password = ?', [username, password], (err, results) => {

      if (err) {
        return res.status(500).send('Database error');
      }
  
      if (results.length === 0) {
        return res.status(400).send('Invalid username or password');
      }
      
      // Successful login
      res.status(200).send(results);
    });
  });

  
// Endpoint to get user details
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM UserDetails', (err, results) => {
      if (err) throw err;
      res.json(results);
  });
});

// Endpoint to get room details for a specific user
app.get('/rooms/:username', (req, res) => {
  const { username } = req.params;
  connection.query('SELECT * FROM RoomDetails WHERE User_Name = ?', [username], (err, results) => {
      if (err) throw err;
      res.json(results);
  });
});

// Endpoint to get room details for a specific user
app.get('/roomLightDetails', (req, res) => {
  const { user_name } = req.query.username;
  const { room_name } = req.query.roomname;
  const sql = 'SELECT * FROM RoomLightDetails WHERE user_name = ? AND room_name = ?';
  connection.query(sql, [req.query.username, req.query.roomname], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results); 
  });
});
  
// // Start the server
// app.listen(port, () => {
//     console.log(Server running on http://localhost:${port});
//   });        

app.listen(port , function(req, res)
{
    console.log("app started at port no " +  port);
});