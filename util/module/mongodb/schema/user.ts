import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  headerIcon: {
    type: String,
    require: true
  },
  nickname: {
    type: String,
    require: true
  },
  bookinfo: {
    type: Object,
    require: true
  }
})

export default mongoose.model("user", userSchema)