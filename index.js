const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/',(req, res)=>{
    res.send('Testing deployment');
});

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
});