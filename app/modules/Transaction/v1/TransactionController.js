class TransactionController {
  constructor(opts) {
    this.transactionService = opts.transactionService;
  
  }

  async getUser(req, res, next) {
    try {
      const _ = this;
      const result = await _.transactionService.getUser(req);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  //returns user transaction by taking address as query params

  async getTransactionByAddress(req, res, next) {
    try {
      const { query} = req;
      const result = await this.transactionService.getTransactionByAddress(query);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
  async remove(req,res,next){
    try {
      const result = await this.transactionService.remove();
      res.send(result);
    } catch (error) {
      next(error)
  }
}
}

module.exports = TransactionController;
