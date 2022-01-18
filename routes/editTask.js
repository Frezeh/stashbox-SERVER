const { Router } = require("express");
const editTaskRouter = Router();
const cors = require("../cors");
const Tasks = require("../models/tasks");

// edit an existing task's status and name
editTaskRouter
  .route("/:taskId")
  .options(cors.corsWithOptions, (res) => {
    res.sendStatus(200);
  })
  .put(cors.cors, (req, res, next) => {
    Tasks.findByIdAndUpdate(
      req.params.taskId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (dish) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(dish);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = editTaskRouter;
