import mongoose from 'mongoose';

const runSchema = new mongoose.Schema(
  {
    flowId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Flow',
    },
    flowName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['RUNNING', 'PASSED', 'FAILED', 'ABORTED'], // ✅ FIX
      required: true,
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    endedAt: {
      type: Date,
    },
    summary: {
      totalSteps: Number,
      passedSteps: Number,
      failedSteps: Number,
    },
    logs: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Run', runSchema);
