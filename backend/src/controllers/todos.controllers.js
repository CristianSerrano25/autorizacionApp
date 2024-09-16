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

export const getTodoByIdCtrl = (req, res) => {
  const todo = database.todos.find((todo) => todo.id === parseInt(req.params.id));
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
}

export const updateTodoCtrl = (req, res) => {
  const todo = database.todos.find((todo) => todo.id === parseInt(req.params.id));
  if (todo) {
    const { title, completed } = req.body;
    todo.title = title;
    todo.completed = completed;
    res.json(todo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
}

export const deleteTodoCtrl = (req, res) => {
  const index = database.todos.findIndex((todo) => todo.id === parseInt(req.params.id));
  if (index !== -1) {
    database.todos.splice(index, 1);
    res.json({ message: "Todo deleted" });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
} 