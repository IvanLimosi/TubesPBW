import express from 'express';

const port = 8080;
const app = express();

app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}/`);
});

app.get('/', (req, res) => {
    res.render('home');
});

// app.get('/add', (req,res) => {
//     res.render('add');
// });

// app.get('/filter/:user', (req,res) => {
//     res.render('filter');
// });