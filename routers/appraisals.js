var express = require('express');
var model = require('../model');
var async=require('async');
var router=express.Router();
var appraisals=model.appraisals;
/*Create an appraisal*/
router.post('/', (req,res)=>{
	var student=req.body.student; /*Refers to students._id*/
	var createdBy=req.body.owner; /*Refers to principal, who created this post*/
	var title=req.body.title;
	var details=req.body.details;
	var timestamp=new Date();
	appraisals.insert({
		student: model.mongojs.ObjectId(student),
		createdBy: model.mongojs.ObjectId(createdBy),
		title: title,
		details:details,
		timestamp:timestamp
	}, (err,doc)=>{
		if(doc){
			res.json({
				code:200,
				id: doc._id
			})
		}else{
			res.json({
				code:400,
				err:err
			})
		}
	})
})
/*Get all appraisals*/
router.get('/all/:owner', (req,res)=>{
	appraisals.find({
		createdBy: req.params.owner
	},(err,docs)=>{
		if(!err){
			res.send({
				code:200,
				appraisal_count:docs.length,
				appraisals:docs
			})
		}else{
			res.send({
				code:400,
				err:err
			})
		}
	})
})
/*aggregate test*/
router.get('/all', (req,res)=>{
	appraisals.aggregate([
	{
		$lookup:{
			from:"users",
			localField:"student",
			foreignField:"_id",
			as:"studentData"
		}
	},
	{
		$lookup:{
			from:"users",
			localField:"createdBy",
			foreignField:"_id",
			as:"ownerData"
		}
	}
	], (err,docs)=>{
		if(!err){
			res.json(docs);
		}else{
			res.json(err);
		}
	});
})
/*Delete an appraisal*/
router.delete('/:id', (req,res)=>{
	var id=req.params.id;
	appraisals.remove({
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