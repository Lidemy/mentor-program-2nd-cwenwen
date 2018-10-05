const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('hello world');
});

app.set('views', './views');
app.set('view engine', 'ejs');

app.listen( 3000, () => console.log('Server is listening Port 3000') );
