const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Handlebars Setup
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Routes
app.get('/', (req, res) => res.redirect('/form1'));

app.get('/form1', (req, res) => res.render('form1'));
app.get('/form2', (req, res) => res.render('form2'));
app.get('/form3', (req, res) => res.render('form3'));

app.post('/submit1', (req, res) => {
  let data = {};
  if (fs.existsSync('data.json')) {
    data = JSON.parse(fs.readFileSync('data.json'));
  }
  data.basic = req.body;
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  res.redirect('/form2');
});

app.post('/submit2', (req, res) => {
  let data = JSON.parse(fs.readFileSync('data.json'));
  data.contact = req.body;
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  res.redirect('/form3');
});

app.post('/submit3', (req, res) => {
  let data = JSON.parse(fs.readFileSync('data.json'));
  data.preferences = req.body;
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  res.redirect('/display');
});

app.get('/display', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
  res.render('display', { data });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
