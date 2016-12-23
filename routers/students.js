var express = require('express');
var model = require('../model');
var router=express.Router();
var users=model.users;
/*Add student*/
router.post('/', (req,res)=>{
	var body=req.body;
	body.type='STUDENT';
	users.insert(body, (err,doc)=>{
		if(doc){
			res.json({
				code: 200,
				id: doc._id
			})
		}else{
			res.json({
				code:400,
				err:err
			})
		}
	});
})
/*Get all users*/
router.get('/all', (req,res)=>{
	users.find((err,docs)=>{
		if(!err){
			res.json({
				count: docs.length,
				students: docs,
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
				student: doc
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
module.exports = router;