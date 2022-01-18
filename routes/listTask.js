const { Router } = require("express");
const listTaskRouter = Router();
const cors = require("../cors");
const Tasks = require("../models/tasks");

// list all tasks from the list
listTaskRouter
  .route("/")
  .options(cors.corsWithOptions, (res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, async (req, res, next) => {
    Tasks.find(req.query)
      .then(
        (task) => {
          const queriedTask = task;

          // filter the queried data to get the status in progress
          const filterStatusInprogress = queriedTask.filter((status) => {
            return status.status === "in-progress";
          });

          // filter the queried data to get the status completed
          const filterStatusCompleted = queriedTask.filter((status) => {
            return status.status === "completed";
          });

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({
            result: task,
            filter: `${filterStatusInprogress.length} status in-progress VS ${filterStatusCompleted.length} status completed`,
          });
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = listTaskRouter;
