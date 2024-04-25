import createError from "http-errors";
import User from "../models/Users.model";
import { IUser } from "../types/model";
//Tra lai ket qua
const getAll = async (query: any) => {
  //Phân trang
  const currentPage = query && query.page ? parseInt(query.page as string) : 1; //trang hiện tại
  const pageSize = query && query.limit ? parseInt(query.limit as string) : 10; // Số lượng items trên 1 trang

  //Sắp xếp tùy chọn theo trường
  let sortObject: any = {}; //Mặc định theo trường sort ASC
  const sortBy = query && query.sortBy ? query.sortBy : "sort";
  const sortType =
    query && query.sortType && query.sortType === "DESC" ? -1 : 1;
  //Thêm phần tử vảo object rỗng
  sortObject = { ...sortObject, [sortBy]: sortType };

  //Lấy danh sách khớp với điều kiện cần lấy
  const Users = await User.find({})
    .select("-__v")
    .sort(sortObject)
    .skip((currentPage - 1) * pageSize)
    .limit(pageSize);
  return {
    Users: Users,
  };
};

const getUserById = async (id: string) => {
  //SELECT * FROM Users WHERE _id = id
  const result = await User.findById(id);

  if (!result) {
    throw createError(404, "User not found");
  }
  return result;
};

const createUser = async (data: IUser) => {
  const result = await User.create(data);
  return result;
};

const updateUser = async (id: string, payload: IUser) => {
  /* Tận dùng hàm có sẳn để tìm xem danh mục có tồn tại chưa */
  const User = await getUserById(id);

  /**
   * Dùng assign để merge giữa cũ và mới lại với nhau
   * Sau đó save lại
   * Muốn update trường nào thì chỉ cần update trường đó
   */
  Object.assign(User, payload);
  await User.save();

  return User;
};

const deleteUser = async (id: string) => {
  // const User = await User.findByIdAndDelete(id);
  /* Tận dùng hàm có sẳn để tìm xem danh mục có tồn tại chưa */
  const User = await getUserById(id);
  await User.deleteOne({ _id: User._id });
  return User;
};

export default {
  getAll,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
