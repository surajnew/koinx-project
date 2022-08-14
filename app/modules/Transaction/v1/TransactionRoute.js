module.exports.routes = (servicelocator, router) => {


  router.get("/transaction", (req, res, next) =>
    servicelocator.get("transactionController").getTransactionByAddress(req, res, next)
  );
  router.get("/remove", (req, res, next) =>
    servicelocator.get("transactionController").remove(req, res, next)
  );
};
