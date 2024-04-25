import { Schema, model } from "mongoose";
import { IUser } from "../types/model";
const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
    max: [15, "độ dài tối đa 15 kí tự"],
  },
  lastName: {
    type: String,
    required: true,
    max: [15, "độ dài tối đa 15 kí tự"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function (v: string) {
      return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        v
      );
    },
    message: (props: any) => `${props.value} email ko đúng với định dạng!`,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    validate: function (v: string) {
      const phoneRegex = /(0[3|5|7|8|9])([0-9]{8})/i;
      return phoneRegex.test(v);
    },
    message: `số điện thoại không đúng`,
  },
});

const User = model<IUser>("User", userSchema);
export default User;
