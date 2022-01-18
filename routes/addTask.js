const { Router } = require("express");
const addTaskRouter = Router();
const cors = require("../cors");
const Tasks = require("../models/tasks");

// add a new task to the To-Do-List
addTaskRouter
  .route("/")
  .options(cors.corsWithOptions, (res) => {
    res.sendStatus(200);
  })
  .post(cors.cors, (req, res, next) => {
    Tasks.create(req.body)
      .then(
        (task) => {
          res.statusCode = 201;
          res.setHeader("Content-Type", "application/json");
          res.json(task);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = addTaskRouter;
