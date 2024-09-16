import { Router } from "express";
import {
    getAllTodosCtrl,
    createTodoCtrl,
    getTodoByIdCtrl,
    updateTodoCtrl,
    deleteTodoCtrl,
} from "../controllers/todos.controllers.js";
import validarJwt from "../middlewares/validar-jwt.js";

const todosRouter = Router();

todosRouter.get("/", validarJwt, getAllTodosCtrl);
todosRouter.post("/", validarJwt, createTodoCtrl);
todosRouter.get("/:id", validarJwt, getTodoByIdCtrl);
todosRouter.put("/:id", validarJwt, updateTodoCtrl);
todosRouter.delete("/:id", validarJwt, deleteTodoCtrl);


export { todosRouter };