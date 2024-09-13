import { database } from "../db/database.js";

export const getAllTodosCtrl = (req, res) => {
  const todos = database.todos.filter((todo) => todo.owner === req.user.id);
  res.json({ todos });
};

export const createTodoCtrl = (req, res) => {
  const { title, completed } = req.body;
  const newTodo = {
    id: database.todos.length + 1,
    title,
    completed,
    owner: req.user.id,
  };
  database.todos.push(newTodo);
  res.status(201).json(newTodo);
};

export const getTodoCtrl = (req, res) => {
  const todo = database.todos.find((todo) => todo.id === req.params.id);
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }
  res.json(todo);
};

export const updateTodoCtrl = (req, res) => {
  const todo = database.todos.find((todo) => todo.id === req.params.id);
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }
  todo.title = req.body.title;
  todo.completed = req.body.completed;
  res.json(todo);
};

export const deleteTodoCtrl = (req, res) => {
  const index = database.todos.findIndex((todo) => todo.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }
  database.todos.splice(index, 1);
  res.status(204).end();
}