import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import session from 'express-session';


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


const port = 8080;
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:false}))

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.json()) 

app.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}/`);
});

const conn = mysql.createConnection({
    host    :'localhost',
    user    :'root',
    password:'',
    database:'tubes'
});

// const pool = mysql.createPool({
//     host    :'localhost',
//     user    :'root',
//     password:'',
//     database:'tubes'
// });

// const dbConnect = () =>{
//     return new Promise((resolve, reject) =>{
//         pool.getConnection((err, conn)=>{
//             if(err){
//                 reject(err);
//             }else{
//                 resolve(conn);
//             }
//         })
//     })
// };

app.get('/register', (req, res) => {
    res.render('signup');
});

app.post('/register', (req,res)=>{
    conn.connect(function(err){
        if(err) {
            console.log(err);
            res.render('signup')
        }
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        var query = `INSERT INTO accounts (username, password, email) VALUES('${username}', '${password}', '${email}')`;
        conn.query(query, function(err,result){
            if(err) {
                throw err;
            }else{
                res.redirect('/login');
            }
        });
    });
});

app.get('/home',(req, res)=>{
    res.render('home',{nama : app.locals.username});
});

app.get('/insertThread',(req, res)=>{
    res.render('insertThread')
});

app.get('/', (req, res) => {
    res.render('landingpage');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/auth',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    var query = `SELECT * FROM accounts WHERE email = '${email}' AND password = '${password}'`;
    if(email && password){
        conn.query(query,function(err,result){
            if(err){
                throw err;
            }
            if(result.length>0){
                req.session.loggedin = true;
                req.session.email = email;
                app.locals.username = result[0].username;
                res.redirect('/home');
            }else{
                res.send('Incorrect Username or Password!');
            }
        });
    }
});

app.get("/logout",(req,res)=>{
    req.logout;
    req.session = null;
    res.redirect("/");
});



// app.get('/add', (req,res) => {
//     res.render('add');
// });

// app.get('/filter/:user', (req,res) => {
//     res.render('filter');
// });