const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Project',
    },
    title: {
      type: String,
      required: [true, 'Task title is required'],
    },
    description: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['To Do', 'In Progress', 'Done'],
      default: 'To Do',
    },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
