import express from 'express';
import { startChainRun } from '../controllers/chainRunController.js';
import { updateChainFlow } from '../controllers/chainRunController.js';
import { finishChainRun } from '../controllers/chainRunController.js';
import ChainRun from '../models/ChainRun.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const chainRuns = await ChainRun
      .find()
      .sort({ startedAt: -1 })
      .limit(50);

    res.json(chainRuns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/start', startChainRun);
router.post('/update-flow', updateChainFlow);
router.post('/finish', finishChainRun);


export default router;
