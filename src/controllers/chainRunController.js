import ChainRun from '../models/ChainRun.js';

export async function startChainRun(req, res) {
  try {
    const { chainId, chainName, flows } = req.body;

    if (!chainId || !chainName || !Array.isArray(flows)) {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    const chainRun = await ChainRun.create({
      chainId,
      chainName,
      flows: flows.map(f => ({
        flowId: f.flowId,
        flowName: f.flowName,
        status: 'PENDING'
      })),
      status: 'RUNNING'
    });

    res.json(chainRun);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to start chain run' });
  }
}
export async function updateChainFlow(req, res) {
  try {
    const { chainRunId, flowId, status, runId } = req.body;

    const chainRun = await ChainRun.findById(chainRunId);
    if (!chainRun) {
      return res.status(404).json({ error: 'ChainRun not found' });
    }

    const flow = chainRun.flows.find(f =>
      f.flowId.toString() === flowId
    );

    if (!flow) {
      return res.status(404).json({ error: 'Flow not found in chain' });
    }

    flow.status = status;
    if (runId) flow.runId = runId;

    // Update overall chain status
    if (status === 'FAILED') {
      chainRun.status = 'FAILED';
      chainRun.endedAt = new Date();
    }

    await chainRun.save();
    res.json(chainRun);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update chain flow' });
  }
}
export async function finishChainRun(req, res) {
  try {
    const { chainRunId, status } = req.body;

    const chainRun = await ChainRun.findById(chainRunId);
    if (!chainRun) {
      return res.status(404).json({ error: 'ChainRun not found' });
    }

    chainRun.status = status;
    chainRun.endedAt = new Date();

    await chainRun.save();
    res.json(chainRun);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to finish chain run' });
  }
}
