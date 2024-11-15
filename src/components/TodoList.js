import React, { useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState({ priority: "All", status: "All" });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleAddTask = () => {
    const updatedTasks = [...tasks, { task: newTask, priority, dueDate, status: 'To Do' }];
    setTasks(updatedTasks);
    setNewTask("");
    setPriority("Medium");
    setDueDate("");
    setShowModal(false);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setShowDeleteConfirm(false);
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setNewTask(tasks[index].task);
    setPriority(tasks[index].priority);
    setDueDate(tasks[index].dueDate);
    setShowModal(true);
  };

  const handleUpdateTask = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editIndex] = { ...updatedTasks[editIndex], task: newTask, priority, dueDate };
    setTasks(updatedTasks);
    setNewTask("");
    setPriority("Medium");
    setDueDate("");
    setEditIndex(null);
    setShowModal(false);
  };

  const handleStatusChange = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = updatedTasks[index].status === "To Do" ? "Done" : "To Do";
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(task => {
    const priorityMatch = filter.priority === "All" || task.priority === filter.priority;
    const statusMatch = filter.status === "All" || task.status === filter.status;
    return priorityMatch && statusMatch;
  });

  return (
    <div className="container mt-5">
      <h2>Task List</h2>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        + Add Task
      </Button>

      {/* Filter Section */}
      <div className="mt-3">
        <Form>
          <Form.Group className="d-flex">
            <Form.Select
              value={filter.priority}
              onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
            >
              <option value="All">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Form.Select>
            <Form.Select
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            >
              <option value="All">All Statuses</option>
              <option value="To Do">To Do</option>
              <option value="Done">Done</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </div>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Task</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task, index) => (
            <tr key={index}>
              <td>{task.task}</td>
              <td>{task.priority}</td>
              <td>{task.dueDate || "N/A"}</td>
              <td>{task.status}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditTask(index)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => { setDeleteIndex(index); setShowDeleteConfirm(true); }}>
                  Delete
                </Button>{' '}
                <Button variant="success" onClick={() => handleStatusChange(index)}>
                  {task.status === "To Do" ? "Mark Done" : "Mark To Do"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Add/Edit Task */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? "Edit Task" : "Add Task"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <Form.Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={editIndex !== null ? handleUpdateTask : handleAddTask}>
            {editIndex !== null ? "Update Task" : "Add Task"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Delete Confirmation */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDeleteTask(deleteIndex)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TodoList;
