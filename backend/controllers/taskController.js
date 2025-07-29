const Task = require('../models/Task');
const Project = require('../models/Project');

// 🟢 Create task under project
const createTask = async (req, res) => {
  const { title, description, status } = req.body;
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId);

    if (!project || project.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Project not found or unauthorized' });
    }

    const task = await Task.create({
      project: projectId,
      title,
      description,
      status,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Task creation failed', error: error.message });
  }
};

// 🔵 Get all tasks for a project
const getTasks = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId);

    if (!project || project.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Project not found or unauthorized' });
    }

    const tasks = await Task.find({ project: projectId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};

// 🟣 Update a task
const updateTask = async (req, res) => {
  const { projectId, taskId } = req.params;
  const { title, description, status } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project || project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to update tasks' });
    }

    const task = await Task.findOneAndUpdate(
      { _id: taskId, project: projectId },
      { title, description, status },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

// 🔴 Delete task
const deleteTask = async (req, res) => {
  const { projectId, taskId } = req.params;

  try {
    const project = await Project.findById(projectId);
    if (!project || project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to delete task' });
    }

    const task = await Task.findOneAndDelete({ _id: taskId, project: projectId });

    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
