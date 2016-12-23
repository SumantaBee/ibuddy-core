var express = require('express');
var model = require('../model');
var router=express.Router();
var users=model.db.collection('users');
/*Get all users*/
router.get('/all', (req,res)=>{
	users.find((err,docs)=>{
		if(!err){
			res.json({
				count: docs.length,
				users: docs,
				code: 200
			})
		}else{
			res.json({
				code: 400,
				err: err
			})
		}
	});
});
/*Get a single user*/
router.get('/id/:id', (req,res)=>{
	var id=req.params.id;
	users.findOne({
		_id: model.mongojs.ObjectId(id)
	}, (err, doc)=>{
		if(doc){
			res.json({
				code: 200,
				user: doc
			})
		}else{
			if(!err){
				res.json({
					code: 300
				})
			}else{
				res.json({
					code: 400,
					err: err
				})
			}
		}
	})
})
/*Login user*/
router.get('/login/:email/:password', (req,res)=>{
	var email=req.params.email;
	var password=req.params.password;
	users.findOne({
		email: email,
		password: password
	}, (err,doc)=>{
		if(!err && !doc){
			res.json({
				code: 400
			})
		}else if(doc){
			res.json({
				code: 200,
				user: doc
			})
		}else{
			res.json({
				code: 400,
				err: err
			})
		}
	})
})
module.exports = router;