require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const models = require('./models');
const jwt = require('jsonwebtoken');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
/* -------------------------------------------------------------------------- */
/*                                   Swagger                                  */
/* -------------------------------------------------------------------------- */

// Extended
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Senang Backend',
      description: 'Senang API Documentation',
      contact: {
        name: 'zulhusnihariz',
      },
      servers: ['http://localhost:8000'],
    },
  },
  apis: ['app.js'],
};

// Extended  https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#infoObject
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */
const baseURL = '/api/senang';

var indexRouter = require('./routes');
var userRouter = require('./routes/user');
var authenticationRouter = require('./routes/authentication');
var productRouter = require('./routes/product');
var locationRouter = require('./routes/location');

app.use(express.urlencoded());
app.use(express.json());
app.use(morgan('combined'));
app.use(cors());

let verifyUser = async (req, res, next) => {
  console.log(req.headers['x-token']);
  if (!!req.headers['x-token']) {
    const accessToken = req.headers['x-token'].split(' ')[1];
    try {
      const verified = await jwt.verify(accessToken, process.env.ACCESS_KEY_SECRET);
      next();
    } catch (error) {
      res.send(403);
    }
  } else {
    res.send(403);
  }
};
app.use(`${baseURL}/auth`, authenticationRouter);

app.use(`${baseURL}/`, indexRouter);
app.use(`${baseURL}/user`, userRouter);
app.use(`${baseURL}/product`, verifyUser, productRouter);
app.use(`${baseURL}/location`, locationRouter);

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
