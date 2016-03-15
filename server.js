//Implement express
var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist',['contactlist']);
var bodyParser = require('body-parser');

//Use static html,css file to load the site
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


app.get('/contactlist', function(req, res){
	// find query to fetch data from db
	db.contactlist.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	});

});


app.post('/contactlist', function(req, res){
	console.log(req.body);
	// insert query to save data in db
	db.contactlist.insert(req.body, function(err, docs){
		if(docs){
			res.json(docs);
		}else{
			console.log(err);
		}
	})
});

app.delete('/contactlist/:id', function(req, res){
	//get data from url (frontend)
	var id = req.params.id;
	console.log(id);
	// delete query to remove data from db
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, docs){
		if(docs){
			res.json(docs)
		}else{
			console.log(err);
		}
	})
});

app.get('/contactlist/:id',function(req, res){
	//get data from url (frontend)
	var id = req.params.id;
	console.log(id);
	//  find data from database using id
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, docs){
		if(docs){
			res.json(docs);
		}else{
			console.log(err);
		}
	})
});

app.put('/contactlist/:id', function(req, res){
	//get data from URL (frontend)
	var id = req.params.id;
	console.log(req.body);
	// update data in database
	db.contactlist.findAndModify(
		{
			query : {_id:mongojs.ObjectId(id)},
			update: {
				$set : {name:req.body.name, email: req.body.email, number: req.body.number}
			},
			new: true
		}, function(err, docs){
			res.json(docs);
		});
});

app.listen(3000);
console.log("Server running on port 3000!!");


/* Dummy data
	person1 = {
		name: 'Rhea',
		email: 'rhea@yahoo.com',
		number: '123123123'
	};
	person2 = {
		name: 'Rishabh',
		email: 'rishabh@hotmail.com',
		number: '222334567'
	};
	person3 = {
		name: 'Raj',
		email: 'Raj@yahoo.com',
		number: '555123123'
	};
	var contactlist = [person1, person2, person3];
	res.json(contactlist);
	*/


/*app.get('/', function(req, res){
	res.send('Hello world from server.js!!');
});
*/