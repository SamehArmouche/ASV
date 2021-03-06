const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors')

const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

// routes
app.use(require('./routes/index'))

app.set('json spaces', 2)
app.listen(PORT, ()=>{
    console.log(`Server on port ${PORT}`);
});