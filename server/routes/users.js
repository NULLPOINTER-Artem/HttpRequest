const express = require('express');
const shortid = require('shortid');
const router = express.Router();
const db = require('../database/database');

/* GET users listing. */
router.get('/', function(req, res, next) {
  let users = db.get('users');
  res.status(200).json({
    status: 'success',
    data: users,
  }); 

}).post('/', function(req, res, next) {
  console.log(req.body);
  if (!req.body) {
    return res.status(400).json({
      status: 'error',
      error: 'req body cannot be empty',
    });
  }

  let usersId = shortid.generate();
  db.get('users').push({...req.body, usersId }).write();

  res.status(200).json({
    status: 'success',
    data: usersId,
  });

}).delete('/', function(req, res, next) {
  let id = req.body;
 
  id = id.usersId;

  db.get('users').remove((item) => item.usersId == id).write();
  
  res.status(200).json({
    status: 'success',
    data: id,
  })
}).put('/', function(req, res, next) {
  let user = req.body;

  db.get('users').find({usersId: user.usersId}).assign(user).write();

  res.status(200).json({
    status: 'success',
    data: user,
  })
})

module.exports = router;
