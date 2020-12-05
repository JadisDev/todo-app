import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
      required: true,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: mongoose.Schema.Types.ObjectId,
  }
)

export default mongoose.model('Todo', TodoSchema);
