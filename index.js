const express = require('express');
const path = require('path');
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
	console.log(req.body);
	handleClientMessage(req.body, function(response){
		res.send(response);
	});
  })
  .get('/db', async (req, res) => {
	  try {
		  const client = await pool.connect();
		  const result = await client.query('SELECT * FROM "user"');
		  const results = { 'results': (result) ? result.rows : null };
		  res.render(`pages/db`, results);
		  client.release();
	  } catch(err) {
		  console.error(err);
		  res.send("Error " + err);
	  }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));


