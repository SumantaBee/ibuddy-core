var express=require('express');
var model=require('../model');
var router=express.Router();
var messages=model.messages;
/* get all threads for a user */
router.get('/allthreads/:from', (req,res)=>{
	var from=req.params.from;
	messages.find({from:from},(err,docs)=>{
		if(!err){
			res.json({
				code:200,
				thread_count:docs.length,
				threads:docs
			})
		}else{
			res.json({
				code:400,
				err:err
			})
		}
	})
})
/* Get a specific thread */
router.get('/thread/:id', (req,res)=>{
	var id=req.params.id;
	messages.findOne({
		_id: model.mongojs.ObjectId(id)
	}, (err,doc)=>{
		if(doc){
			res.json({
				code:200,
				thread:doc
			})
		}else{
			res.json({
				code:400,
				err:err
			})
		}
	})
})
/*find or create a thread*/
router.post('/thread', (req,res)=>{
	
})
/*Put a message*/
/*router.post('/message', (req,res)=>{*/
	/*ALGO*/
	/*
	* Check if a record exists with the sender and receiver
	* If it exists get the 'messages' attribute and push the next message
	* If there is no thread
	* Create a new thread
	* Update thread last update date
	* Update count
	* Assign id to message
	*/
	/*var from=req.body.from;
	var to=req.body.to;
	var message=req.body.message;
	var timestamp=new Date();
	messages.findOne({
		from:from,
		to:to
	},(err,doc)=>{
		var thread={};
		if(!doc){*/
			/*Thread not created yet*/
			/*var thread={
				from: from,
				to: to,
				count: 1,
				messages:[{
					message:{
						message:message,
						timestamp: timestamp
					}
				}],
				lastMessage: timestamp
			}
			messages.insert(thread, (err,doc)=>{
				if(doc){
					res.json({
						id
					})
				}
			})
		}else{

		}
	})
});*/
module.exports=router;