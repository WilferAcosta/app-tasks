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
  res.redirect('/links');
});
// LAS LISTAS ACA
router.get('/',async (req,res)=> {
  const links = await pool.query('SELECT * FROM links');
   res.render('links/list',{links});
});
//envento para eliminar
router.get('/delete/:id', async (req, res)=>{
  const {id} = req.params;
  await pool.query('DELETE FROM links WHERE ID = ?', [id]);
  res.redirect('/links');
});
//para editar
router.get('/edit/:id', async (req, res)=>{
  const {id} = req.params;
  const links = await pool.query('SELECT * FROM links WHERE id = ?',[id]);
  res.render('links/edit', {links: links[0]});
});
//otra ruta para agregar el edit
router.post('/edit/:id', async (req,res)=>{
  const {id}=req.params;
  const {title, description,url} = req.body;
  const newLink = {
    title,
    description,
    url
  };
  console.log(newLink);
  await pool.query('UPDATE links set ? WHERE id = ?',[newLink,id]);
  res.redirect('/links');

})


module.exports = router;