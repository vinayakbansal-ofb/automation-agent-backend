import mongoose from 'mongoose';

const RunSchema = new mongoose.Schema(
  {
    flowId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flow',
      required: true
    },

    flowName: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ['PASSED', 'FAILED'],
      required: true
    },

    startedAt: {
      type: Date,
      required: true
    },

    finishedAt: {
      type: Date
    },

    failedStepIndex: {
      type: Number
    },

    failureReason: {
      type: String
    },

    logs: [
      {
        time: String,
        type: String,   // info | success | error
        message: String
      }
    ]
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Run', RunSchema);
