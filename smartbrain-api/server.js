const express = require('express');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors());

const database = {
	users: [
		{
			id : "123",
			name : "Ashish",
			email : "ashishkr.2149@gmail.com",
			password : "ashishkr.2149",
			entries : 0,
			joined : new Date()
		},
		{
			id : "124",
			name : "Rishu",
			email : "aspk0711@gmail.com",
			password : "Ashish@2149",
			entries : 0,
			joined : new Date()
		}
	]
}

app.get('/', (req, res) => {
	res.send(database.users);
})

app.post('/signin', (req, res) => {

		if(database.users[0].email === req.body.email && database.users[0].password === req.body.password){
			res.status(200).json(database.users[0]);
		}
		else{
			res.status(400).json("Error while Signing In");
		}

})

app.post('/register', (req, res) => {

	const { email, name, password } = req.body;

	// bcrypt.hash(password, null, null, (err,hash) => {
	// 	console.log(hash);
	// })

	database.users.push({
		id : "125",
		name : name,
		email : email,
		password : password,
		entries : 0,
		joined : new Date()
	})

	res.send(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {

	const { id } = req.params;
	let found = false;

	database.users.forEach((user) => {
		if(user.id === id){
			found = true;
			return res.json(user);
		}
	})
	if(!found){
		res.status(404).json("Profile not Found.")
	}
})

app.put('/image', (req, res) => {

	const { id } = req.body;
	let found = false;

	database.users.forEach((user) => {
		if(user.id === id){
			found = true;
			user.entries++;
			return res.json(user.entries);
		}
	})
	if(!found){
		res.status(404).json("Profile not Found.")
	}
})

app.listen(3000,()=>{
	console.log("App is running on port 3000");
});