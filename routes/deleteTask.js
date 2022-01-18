const { Router } = require("express");
const deleteTaskRouter = Router();
const cors = require("../cors");
const Tasks = require("../models/tasks");

// delete an existing task's status and name
deleteTaskRouter
  .route("/:taskId")
  .options(cors.corsWithOptions, (res) => {
    res.sendStatus(200);
  })
  .delete(cors.cors, (req, res, next) => {
    Tasks.findById(req.params.taskId)
      .updateMany({}, { $unset: { name: "", status: "" } })
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = deleteTaskRouter;
