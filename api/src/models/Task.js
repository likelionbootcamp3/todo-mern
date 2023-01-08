import mongoose from "mongoose";
const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    name: String, // String is shorthand for {type: String}
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
