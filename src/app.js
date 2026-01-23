import express from 'express';
import cors from 'cors';

import flowRoutes from './routes/flows.js';
import runRoutes from './routes/runs.js';
import chainRunsRoutes from './routes/chainRuns.js';



const app = express();

// Middleware (ORDER MATTERS)
app.use(cors());
app.use(express.json({ limit: '5mb' }));

// Routes
app.use('/api/flows', flowRoutes);
app.use('/api/runs', runRoutes);
app.use('/api/chain-runs', chainRunsRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ui-automation-backend',
  });
});

export default app;
