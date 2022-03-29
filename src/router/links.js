const express = require('express');
const router = express.Router();
//referencia a la conecxion a las base de datos 
const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');
//peticion 
router.get('/add',isLoggedIn, (req, res) => {
  res.render('links/add');
});

router.post('/add',isLoggedIn, async (req, res) => {
  const { title, url, description} = req.body;
  const newLink = {
    title,
    url,
    description,
    user_id: req.user.id
  };
  await pool.query('INSERT INTO links set ?', [newLink]);
  req.flash('success', 'Link saved successfully');
  res.redirect('/links');
});
// LAS LISTAS ACA
router.get('/',isLoggedIn, async (req,res)=> {
  const links = await pool.query('SELECT * FROM links WHERE user_id = ?',[req.user.id]);
   res.render('links/list',{links});
});
//envento para eliminar
router.get('/delete/:id',isLoggedIn, async (req, res)=>{
  const {id} = req.params;
  await pool.query('DELETE FROM links WHERE ID = ?', [id]);
  req.flash('success','link Removed successfully');
  res.redirect('/links');
});
//para editar
router.get('/edit/:id',isLoggedIn, async (req, res)=>{
  const {id} = req.params;
  const links = await pool.query('SELECT * FROM links WHERE id = ?',[id]);
  res.render('links/edit', {links: links[0]});
});
//otra ruta para agregar el edit
router.post('/edit/:id',isLoggedIn, async (req,res)=>{
  const {id}=req.params;
  const {title, description,url} = req.body;
  const newLink = {
    title,
    description,
    url
  };
  await pool.query('UPDATE links set ? WHERE id = ?',[newLink,id]);
  req.flash('success','link Updated successfully');
  res.redirect('/links');

});


module.exports = router;