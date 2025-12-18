import express from 'express';
import Flow from '../models/Flow.js';

const router = express.Router();

/**
 * GET /api/flows
 * List all active flows
 */
router.get('/', async (req, res) => {
  try {
    const flows = await Flow.find({ isActive: true }).sort({ updatedAt: -1 });
    res.json(flows);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch flows' });
  }
});

/**
 * POST /api/flows
 * Create a new flow
 */
router.post('/', async (req, res) => {
  try {
    const { name, description, steps, createdBy } = req.body;

    if (!name || !steps || !Array.isArray(steps)) {
      return res.status(400).json({ message: 'Invalid flow data' });
    }

    const flow = await Flow.create({
      name,
      description,
      steps,
      createdBy,
    });

    res.status(201).json(flow);
  } catch (error) {
    console.error("DETAILED POST ERROR:", error); // ADD THIS LINE
    res.status(500).json({ message: error.message }); // Send message for debugging
  }
});

/**
 * GET /api/flows/:id
 * Fetch a single flow
 */
router.get('/:id', async (req, res) => {
  try {
    const flow = await Flow.findById(req.params.id);
    if (!flow || !flow.isActive) {
      return res.status(404).json({ message: 'Flow not found' });
    }
    res.json(flow);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch flow' });
  }
});

/**
 * PUT /api/flows/:id
 * Update an existing flow
 */
router.put('/:id', async (req, res) => {
    try {
      const flow = await Flow.findById(req.params.id);
      if (!flow) return res.status(404).json({ message: 'Flow not found' });
  
      // Update fields
      flow.name = req.body.name || flow.name;
      flow.steps = req.body.steps || flow.steps;
      flow.description = req.body.description || flow.description;
      
      // Increment version
      flow.version = (flow.version || 0) + 1;
  
      const saved = await flow.save();
      res.json(saved);
    } catch (error) {
      console.error("UPDATE ERROR:", error);
      res.status(500).json({ message: 'Failed to update flow' });
    }
  });

/**
 * DELETE /api/flows/:id
 * Soft delete a flow
 */
router.delete('/:id', async (req, res) => {
  try {
    const flow = await Flow.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!flow) {
      return res.status(404).json({ message: 'Flow not found' });
    }

    res.json({ message: 'Flow deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete flow' });
  }
});

export default router;
