const { Router } = require("express");
const homePageRouter = Router();

/* GET home page. */
homePageRouter.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = homePageRouter;
