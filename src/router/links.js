const express = require('express');
const router = express.Router();
//referencia a la conecxion a las base de datos 
const pool = require('../database');
//peticion 
router.get('/add', (req, res) => {
  res.render('links/add');
});

router.post('/add', async (req, res) => {
  const {title, url, description} = req.body;
  const newLink = {
    title,
    url,
    description
  };
  await pool.query('INSERT INTO links set ?', [newLink]);
  res.send('received');
});

module.exports = router;