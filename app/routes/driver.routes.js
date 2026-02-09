const controller = require("../controllers/driver.controller");
const { authJwt } = require("../middlewares");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  
  app.get(
    "/api/drivers",
    [authJwt.verifyToken], 
    controller.findAll
  );

  
  app.get(
    "/api/drivers/:id",
    [authJwt.verifyToken], 
    controller.findOne
  );

  
  app.post(
    "/api/drivers",
    [authJwt.verifyToken, authJwt.isAdmin], 
    controller.create
  );

  
  app.put(
    "/api/drivers/:id",
    [authJwt.verifyToken, authJwt.isAdmin], 
    controller.update
  );

  
  app.delete(
    "/api/drivers/:id",
    [authJwt.verifyToken, authJwt.isAdmin], 
    controller.delete
  );
};