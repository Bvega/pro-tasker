const Project = require('../models/Project');

// 🟢 Create new project
const createProject = async (req, res) => {
  const { name, description } = req.body;

  try {
    const project = await Project.create({
      user: req.user._id,
      name,
      description,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Project creation failed', error: error.message });
  }
};

// 🔵 Get all projects of current user
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
};

// 🟣 Get single project (must be owner)
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project || project.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Project not found or unauthorized' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project', error: error.message });
  }
};

// 🟡 Update project (must be owner)
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project || project.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Project not found or unauthorized' });
    }

    project.name = req.body.name || project.name;
    project.description = req.body.description || project.description;

    const updated = await project.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
};

// 🔴 Delete project (must be owner)
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project || project.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Project not found or unauthorized' });
    }

    await project.deleteOne();
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
