import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


const port = 8080;
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}/`);
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