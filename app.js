require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const models = require('./models');

const baseURL = '/api/senang';

/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */
var indexRouter = require('./routes');

var userRouter = require('./routes/user');
var authenticationRouter = require('./routes/authentication');

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(morgan('combined'));
app.use(cors());

app.use(`${baseURL}/`, indexRouter);
app.use(`${baseURL}/user`, userRouter);
app.use(`${baseURL}/auth`, authenticationRouter);

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

models.sequelize.sync().then(() => {
  console.log(`Server started on port: ${process.env.PORT}`);
  app.listen(process.env.PORT);
});

module.exports = app;

// const express = require('express');
// const app = express();
// const port = 3000;

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });
