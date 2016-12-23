var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:admin@ds127978.mlab.com:27978/heroku_3l161qp1');
module.exports = {
	db:db,
	mongojs:mongojs,
	schools: db.collection('schools'),
	users: db.collection('users'),
	notifications: db.collection('notifications'),
	messages: db.collection('messages'),
	appraisals: db.collection('appraisals')
};