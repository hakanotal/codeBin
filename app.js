//require('dotenv').config(); // For development

const app = require('./server');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

// Database
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Database connected.'));

// Server
app.listen(port, () => console.log('Server started.'));
