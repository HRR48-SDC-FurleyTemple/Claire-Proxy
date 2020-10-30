require('newrelic');
const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(express.urlencoded());
const PORT = 8000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/products', express.static(path.join(__dirname, 'public')));

app.get('/products/:productId', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// app.get('/api/reviews/products/:productId', (req, res) => {
//   axios.get(`http://localhost:3003/api/reviews/products/${req.param('productId')}`).then((results) => {
//     res.send(results.data);
//   }).catch((error) => {
//     res.send(error);
//   })
// })

app.get('/api/productOptions/products/:productId', (req, res) => {
  axios.get(`http://sdc-service-1513906909.us-east-2.elb.amazonaws.com/api/productOptions/products/${req.param('productId')}`).then((results) => {
    res.send(results.data);
  }).catch((error) => {
    res.send(error);
  })
})

app.get('/api/similarProducts/products/:productId', (req, res) => {
  axios.get(`http://ec2-3-139-11-36.us-east-2.compute.amazonaws.com/api/similarProducts/products/${req.param('productId')}`).then((results) => {
    res.send(results.data);
  }).catch((error) => {
    res.status(404).end();
  })
})

app.post('/api/similarProducts/products', (req, res) => {
  console.log("request", req.body)
  axios.post(`http://ec2-3-139-11-36.us-east-2.compute.amazonaws.com/api/similarProducts/products`, req.body).then((result) => {
    res.status(201).send('added to products');
  }).catch((error) => {
    //console.log(error)
    res.status(400).end();
  })
})

// app.get('/api/productView/products/:productId', (req, res) => {
//   axios.get(`http://localhost:3002/api/productView/products/${req.param('productId')}`).then((results) => {
//     res.send(results.data);
//   }).catch((error) => {
//     res.send(error);
//   })
// })


app.listen(PORT, () => {
  console.log('listening on port: ' + PORT);
})
