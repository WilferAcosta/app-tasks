const express = require('express');
const router = express.Router();
//referencia a la conecxion a las base de datos 
const pool = require('../database');
//peticion 
router.get('/add', (req, res) => {
  res.render('links/add');
});

router.post('/add', (req,res) => {
  res.send('received');
});

module.exports = router;