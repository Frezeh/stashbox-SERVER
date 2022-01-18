const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Tasks = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
    status: {
      type: String,
      required: [true, "Please enter an in-progress or completed status"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("task", Tasks);
