import express from 'express';

const app = express();

app.use(express.json());

import usersRouter from './usersRouter.js';

app.use('/api', usersRouter);

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Users API',
        version: '1.0.0',
      },
    },
    apis: ['./routes*Router.js'], 
  };

  const swaggerOptions = {
    swaggerDefinition,
    apis: ['./usersRouter.js'], 
  };

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerOptions)));

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => console.log('Server is running on Port : ', PORT))

