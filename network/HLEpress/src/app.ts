import express from 'express';
const cors = require('cors'); // npm install cors


const app = express();
const port = 3001; // or process.env.PORT

app.use(cors());
app.use(express.json());
app.post('/test', (req, res) => {
    console.log(req.body); // Should log the JSON body sent from Postman
    res.json({ message: 'Received' });
  });

const org1 = require('./org1');
const org2 = require('./org2');
const org3 = require('./org3');


app.use('/org1', org1);
app.use('/org2', org2);
app.use('/org3', org3);



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});