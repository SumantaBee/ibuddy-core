var express = require('express');
var model = require('../model');
var router=express.Router();
var notifications=model.notifications;
router.get('/all', (req,res)=>{
	notifications.find((err,docs)=>{
		if(!err){
			res.send({
				code:200,
				notification_count:docs.length,
				notifications:docs
			})
		}else{
			res.send({
				code:400,
				err:err
			})
		}
	})
})
router.post('/', (req,res)=>{
	var content=req.body.content;
	var type=req.body.type;
	notifications.insert({
		content:content,
		type:type,
		issuedOn:new Date()
	}, (err,doc)=>{
		if(!err){
			res.send({
				code:200,
				id: doc._id
			})
		}else{
			res.send({
				code:400,
				err:err
			})
		}
	})
})
router.delete('/:id', (req,res)=>{
	var id=req.params.id;
	notifications.remove({
		_id:model.mongojs.ObjectId(id)
	}, (err,doc)=>{
		if(!err){
			res.send({
				code:200
			})
		}else{
			res.send({
				code:400
			})
		}
	})
})
module.exports=router;