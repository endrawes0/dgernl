const express = require('express');
const path = require('path');
const users = require('./users');
const { handleClientMessage } = require('./dgernl');

const PORT = process.env.PORT || 5000

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/clientMessage', async (req, res) => {
	console.log("Client Message: " + JSON.stringify(req.body));
	handleClientMessage(req.body, (response) => res.send(response));
  })
  .get('/db', async (req, res) => {
	  try {
		  const userList = await users.getAllUsers();
		  res.render(`pages/db`, {userList});
	  } catch(err) {
		  console.error(err);
		  res.send("Error " + err);
	  }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
  