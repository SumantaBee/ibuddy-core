var express=require('express');
var model=require('../model');
var router=express.Router();
/*Add new school*/
router.post('/', (req,res)=>{
	var body=req.body;
	model.schools.insert({
		name: body.name
	}, (err,doc)=>{
		if(doc){
			res.json({
				id: doc._id,
				code: 200
			})
		}else{
			res.json({
				code: 400,
				err: err
			})
		}
	})
})
/*Get all schools*/
router.get('/all', (req,res)=>{
	model.schools.find((err,docs)=>{
		if(!err){
			res.json({
				code: 200,
				count: docs.length,
				schools: docs
			})
		}else{
			res.json({
				code: 400,
				err: err
			})
		}
	})
})
/*Get single school by id*/
router.get('/id/:id', (req,res)=>{
	var id=req.params.id;
	model.schools.findOne({
		_id: model.mongojs.ObjectId(id)
	}, (err, doc)=>{
		if(doc){
			res.json({
				code: 200,
				school: doc
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