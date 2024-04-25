import express from "express";
import usersController from "../../controlllers/users.controller";
const route = express.Router();
route.get("", usersController.getAll);
route.post("", usersController.createUser);
route.get("/:id", usersController.getById);
route.put("/:id", usersController.updateUser);
route.delete("/:id", usersController.deleteUser);
export default route;
