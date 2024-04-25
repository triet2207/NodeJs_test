import usersService from "../servers/users.service";
import { Request, Response, NextFunction } from "express";

const sendJsonSuccess = (res: Response) => (data: any) => {
  res.json({
    success: true,
    data: data,
  });
};

// Get all
const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await usersService.getAll(req.query);
    sendJsonSuccess(res)(result);
  } catch (error) {
    next(error);
  }
};

// Get by ID
const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await usersService.getUserById(id);
    sendJsonSuccess(res)(result);
  } catch (error) {
    next(error);
  }
};

// Create
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const result = await usersService.createUser(data);
    sendJsonSuccess(res)(result);
  } catch (error) {
    next(error);
  }
};

// Update by ID
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await usersService.updateUser(id, data);
    sendJsonSuccess(res)(result);
  } catch (error) {
    next(error);
  }
};

// Delete by ID
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await usersService.deleteUser(id);
    sendJsonSuccess(res)(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  getById,
  createUser,
  updateUser,
  deleteUser,
};
