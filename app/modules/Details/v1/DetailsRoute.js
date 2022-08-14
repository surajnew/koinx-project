module.exports.routes = (servicelocator, router) => {
  router.get("/user-details", (req, res, next) =>
    servicelocator.get("userController").getUser(req,res,next)
  );
};
