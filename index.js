const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const notesRouter = require('./routes/notes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/notes', notesRouter);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.MONGODB_DBNAME
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch(err => {
  console.log('MongoDB connection error:', err);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});