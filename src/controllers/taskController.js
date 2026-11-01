const tasks = require('../data/tasks');

const getAllTasks = (req, res) => {
    res.status(200).json(tasks);
};

const getTaskById = (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ message: `${id} numaralı görev bulunamadı` });
    }

    res.status(200).json(task);
};

const createTask = (req, res) => {
    const { title, description, status, priority, assignee } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'title (başlık) alanı zorunludur' });
    }

    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    const now = new Date().toISOString();

    const newTask = {
        id: newId,
        title,
        description: description || '',
        status: status || 'todo',
        priority: priority || 'medium',
        assignee: assignee || null,
        createdAt: now,
        updatedAt: now
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
};

const updateTask = (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ message: `${id} numaralı görev bulunamadı` });
    }

    const { title, description, status, priority, assignee } = req.body || {};

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;
    if (assignee !== undefined) task.assignee = assignee;

    task.updatedAt = new Date().toISOString();

    res.status(200).json(task);
};

const deleteTask = (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: `${id} numaralı görev bulunamadı` });
  }

  const deletedTask = tasks.splice(index, 1)[0];

  res.status(200).json({ message: `${id} numaralı görev silindi`, task: deletedTask });
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};