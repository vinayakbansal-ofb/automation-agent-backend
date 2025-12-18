import express from 'express';
import cors from 'cors';
import flowRoutes from './routes/flows.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use('/api/flows', flowRoutes);
// Health check (MANDATORY)
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ui-automation-backend',
  });
});

export default app;
