module.exports.routes = (servicelocator, router) => {
  router.post("/create-account", (req, res, next) =>
    servicelocator.get("userController").createAccount(req, res, next)
  );

  router.get("/balance", (req, res, next) =>
    servicelocator.get("userController").getBalance(req, res, next)
  );
};
