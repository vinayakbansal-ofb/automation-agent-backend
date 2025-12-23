import express from 'express';
import Run from '../models/Run.js';

const router = express.Router();

/**
 * START a run
 */
router.post('/start', async (req, res) => {
  try {
    const { flowId, flowName } = req.body;

    const run = await Run.create({
        flowId,
        flowName,
        status: 'RUNNING',   // ✅ always RUNNING
        startedAt: new Date(),
        logs: [],
      });

    res.json(run);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * FINISH a run
 */
router.post('/:runId/finish', async (req, res) => {
  try {
    const { status, failedStepIndex, failureReason, logs } = req.body;

    const run = await Run.findByIdAndUpdate(
      req.params.runId,
      {
        status,
        failedStepIndex,
        failureReason,
        logs,
        finishedAt: new Date()
      },
      { new: true }
    );

    res.json(run);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET run history for a flow
router.get('/', async (req, res) => {
  try {
    const { flowId } = req.query;

    if (!flowId) {
      return res.status(400).json({ error: 'flowId is required' });
    }

    const runs = await Run.find({ flowId })
      .sort({ createdAt: -1 })
      .limit(50); // safety cap

    res.json(runs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
