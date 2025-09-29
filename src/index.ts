import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './config/swagger';
import { config } from './config/environment';
import { database } from './config/database';

async function startServer() {
  try {
    await database.connect();
    
    const app = express();
    
    app.use(express.json());
    
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
    
    const pingRoutes = await import('./routes/ping');
    const apiRoutes = await import('./routes/api');
    
    app.use('/', pingRoutes.default);
    app.use('/', apiRoutes.default);
    
    app.listen(config.port, () => {
      console.log(`Server running on http://localhost:${config.port}`);
      console.log(`Swagger docs available at http://localhost:${config.port}/api-docs`);
      console.log(`Environment: ${config.nodeEnv}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();