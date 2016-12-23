var express=require('express');
var bodyParser=require('body-parser');
var cors = require('cors');
var usersRouter=require('./routers/users');
var studentRouter=require('./routers/students');
var schoolRouter=require('./routers/schools');
var notificationsRouter=require('./routers/notifications');
var chatRouter=require('./routers/chat');
var appraisalRouter=require('./routers/appraisals');
var app=express();
var port=(process.env.PORT || 5000);
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use('/users',usersRouter);
app.use('/schools', schoolRouter);
app.use('/students', studentRouter);
app.use('/notifications', notificationsRouter);
app.use('/chats', chatRouter);
app.use('/appraisals', appraisalRouter);
app.listen(port,()=>{
	console.log('Server running on port '+ port);
})