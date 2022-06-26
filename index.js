import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql';


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


const port = 8080;
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}/`);
});

const conn = mysql.createConnection({
    host    :'localhost',
    user    :'root',
    password:'',
    database:'tubes'
});

app.post('/register', (req,res)=>{
    conn.connect(function(err){
        if(err) {
            console.log(err);
            res.render('register')
        }
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        var query = `INSERT INTO accounts (username, password, email) VALUES('${username}', '${password}', '${email}')`;
        conn.query(query, function(err,result){
            result.redirect("/login");
        });
    });
});

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('signup');
});

// app.get('/add', (req,res) => {
//     res.render('add');
// });

// app.get('/filter/:user', (req,res) => {
//     res.render('filter');
// });