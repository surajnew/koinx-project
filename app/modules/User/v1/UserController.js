class UserController {
  constructor(opts) {
    this.userService = opts.userService;
    this.dbName = "User";
  }

  async getUser(req, res, next) {
    try {
      const _ = this;
      const result = await _.userService.getUser(req);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  async createAccount(req, res, next) {
    const _=this;
    try {
      const { body } = req;
      const result = await _.userService.createAccount(body);
      res.send(result) 
    } catch (error) {
      next(error);
    }
  }
  async getBalance(req, res, next) {
    const _=this;
    try {
      const { query } = req;
      const result = await _.userService.getBalance(query);
      res.send(result) 
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
