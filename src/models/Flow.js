import mongoose from 'mongoose';

const StepSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    action: { type: String, required: true },

    selectors: { type: [String], default: [] },
    selector: { type: String, default: '' },

    value: { type: String, default: '' },

    // 🔑 CAPTURE & VARIABLE SUPPORT (MANDATORY)
    saveAs: { type: String, default: null },
    anchorText: { type: String, default: null },
    relation: { type: String, default: null },

    nl_prompt: { type: String, default: '' },
    meta: { type: Object, default: {} },
  },
  { _id: false }
);


const FlowSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    steps: { type: [StepSchema], required: true },
    version: { type: Number, default: 1 },
    createdBy: { type: String, default: 'system' },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true, // creates createdAt & updatedAt
  }
);

export default mongoose.model('Flow', FlowSchema);
