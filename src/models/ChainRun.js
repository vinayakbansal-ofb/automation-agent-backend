import mongoose from 'mongoose';

const chainRunSchema = new mongoose.Schema(
  {
    chainId: {
      type: String,
      required: true, // stable ID from frontend
    },

    chainName: {
      type: String,
      required: true,
    },

    // Ordered flows in the chain
    flows: [
      {
        flowId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Flow',
          required: true,
        },
        flowName: {
          type: String,
          required: true,
        },
        runId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Run',
        },
        status: {
          type: String,
          enum: ['PENDING', 'RUNNING', 'PASSED', 'FAILED'],
          default: 'PENDING',
        },
      },
    ],

    status: {
      type: String,
      enum: ['RUNNING', 'PASSED', 'FAILED'],
      default: 'RUNNING',
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    endedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model('ChainRun', chainRunSchema);
