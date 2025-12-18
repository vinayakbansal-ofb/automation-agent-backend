import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
app.use(cors());
import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${PORT}`);
  });
};

startServer();
